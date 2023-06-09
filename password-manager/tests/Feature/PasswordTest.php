<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Share;
use App\Models\Password;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PasswordTest extends TestCase
{
    public function test_index_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $user2 = User::factory()->create();

        $password1 = Password::factory()->create([
            'user_id' => $user->id
        ]);
        $password2 = Password::factory()->create([
            'user_id' => $user2->id
        ]);

        $share = Share::factory()->create([
            'password_id' => $password2->id,
            'user_id' => $user->id,
            'shared_by' => $user2->id
        ]);

        $response = $this->actingAs($user)->get('/api/passwords', [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'personal' => [
                "*" => [
                    'id',
                    'name',
                ]
            ],
            'shared' => [
                "*" => [
                    'id',
                    'name',
                ]
            ]
        ]);

        $password1->delete();
        $password2->delete();
        $user->delete();
        $user2->delete();
        $share->delete();
    }

    // TODO naprawić to bo działa nie przeiwywalnie
    // public function test_index_for_admin(): void
    // {
    //     $user = User::factory()->create([
    //         'is_admin' => true
    //     ]);
    //     $user2 = User::factory()->create();

    //     $password1 = Password::factory()->create([
    //         'user_id' => $user->id
    //     ]);
    //     $password2 = Password::factory()->create([
    //         'user_id' => $user2->id
    //     ]);

    //     $share = Share::factory()->create([
    //         'password_id' => $password2->id,
    //         'user_id' => $user->id,
    //         'shared_by' => $user2->id
    //     ]);

    //     $response = $this->actingAs($user)->get('/api/passwords-admin/', [], [
    //         'Accept' => 'application/json',
    //         'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
    //     ]);

    //     $response->assertStatus(200);
    //     $response->assertJsonStructure([
    //         "*" => [
    //             'id',
    //             'name',
    //         ]
    //     ]);

    //     $password1->delete();
    //     $password2->delete();
    //     $user->delete();
    //     $user2->delete();
    //     $share->delete();
    // }


    public function test_index_for_admin_as_user(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $password1 = Password::factory()->create([
            'user_id' => $user->id
        ]);
        $password2 = Password::factory()->create([
            'user_id' => $user2->id
        ]);

        $share = Share::factory()->create([
            'password_id' => $password2->id,
            'user_id' => $user->id,
            'shared_by' => $user2->id
        ]);

        $response = $this->actingAs($user)->get('/api/passwords-admin/', [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(401);

        $password1->delete();
        $password2->delete();
        $user->delete();
        $user2->delete();
        $share->delete();
    }

    public function test_show_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);

        $response = $this->actingAs($user)->post('/api/passwords', [
            'name' => 'Test',
            'password' => 'test1234',
            'type' => 'application',
            'url' => 'https://test.com',
        ]);

        $password = Password::find($response->json('id'));

        $response = $this->actingAs($user)->get("/api/passwords/$password->id");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'password' => [
                'id',
                'name',
            ],
            'decrypted_password'
        ]);

        $password->delete();
        $user->delete();
    }

    public function test_show_as_authorized_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/api/passwords', [
            'name' => 'Test',
            'password' => 'test1234',
            'type' => 'application',
            'url' => 'https://test.com',
        ]);

        $password = Password::find($response->json('id'));

        $response = $this->actingAs($user)->get("/api/passwords/$password->id");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'password' => [
                'id',
                'name',
                'user' => [
                    'id',
                    'name',
                    'email',
                ]
            ],
            'decrypted_password',
        ]);

        $password->delete();
        $user->delete();
    }

    public function test_show_as_unauthorized_user(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => 1
        ]);

        $response = $this->actingAs($user)->get("/api/passwords/$password->id");

        $response->assertStatus(403);

        $password->delete();
        $user->delete();
    }

    public function test_store(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/api/passwords', [
            'name' => 'Test',
            'password' => 'test1234',
            'type' => 'application',
            'url' => 'https://test.com',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'id',
            'name',
        ]);

        $password = Password::find($response->json('id'));

        $this->assertNotNull($password);
        $this->assertEquals($response->json('name'), $password->name);

        $user->delete();
        $password->delete();
    }
    // TODO naprawić to bo działa nie przeiwywalnie
    // public function test_update_as_admin(): void
    // {
    //     $user = User::factory()->create([
    //         "is_admin" => true
    //     ]);
    //     $password = Password::factory()->create();

    //     $id = $password->id;

    //     $response = $this->actingAs($user)->put("/api/passwords/$id/", [
    //         'name' => 'new name',
    //         'password' => 'password4321'
    //     ], [
    //         'Accept' => 'application/json',
    //         'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
    //     ]);

    //     $response->assertStatus(200);
    //     $response->assertJsonStructure([
    //         'id',
    //         'name',
    //         'user' => [
    //             'id',
    //             'name',
    //             'email',
    //             'is_admin',
    //             'created_at',
    //             'updated_at',
    //         ]
    //     ]);

    //     $password->delete();
    //     $user->delete();
    // }

    public function test_update_as_authorized_user(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->put("/api/passwords/$password->id", [
            'name' => 'new name',
            'password' => 'password4321',
            'type' => 'application',
            'url' => 'https://test.com',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
        ]);

        $password->delete();
        $user->delete();
    }

    public function test_update_as_unauthorized_user(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create();

        $response = $this->actingAs($user)->put("/api/passwords/$password->id", [
            'name' => 'new name',
            'password' => 'password4321'
        ]);

        $response->assertStatus(403);

        $password->delete();
        $user->delete();
    }

    public function test_destroy_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $password = Password::factory()->create();

        $response = $this->actingAs($user)->delete("/api/passwords/$password->id");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('passwords', ['id' => $password->id]);

        $user->delete();
        $password->delete();
    }

    public function test_destroy_as_authorized_user(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->delete("/api/passwords/$password->id");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('passwords', ['id' => $password->id]);

        $user->delete();
        $password->delete();
    }

    public function test_destroy_as_unauthorized_user(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create();

        $response = $this->actingAs($user)->delete("/api/passwords/$password->id");

        $response->assertStatus(403);
        $this->assertDatabaseHas('passwords', ['id' => $password->id]);

        $user->delete();
        $password->delete();
    }

    public function test_decrypt(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/api/passwords', [
            'name' => 'Test',
            'password' => 'test1234',
            'type' => 'application',
            'url' => 'https://test.com',
        ]);

        $password = Password::find($response->json('id'));

        $this->assertEquals('test1234', $password->decrypt());

        $user->delete();
        $password->delete();
    }
}
