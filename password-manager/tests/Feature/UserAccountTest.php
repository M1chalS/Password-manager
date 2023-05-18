<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserAccountTest extends TestCase
{
    public function test_index_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);

        $response = $this->actingAs($user)->get('/api/users', [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'last_name',
                'email',
                'is_admin',
                'created_at',
                'updated_at'
            ]
        ]);

        $user->delete();
    }

    public function test_index_as_user(): void
    {
        $user = User::factory()->create([
            'is_admin' => false
        ]);

        $response = $this->actingAs($user)->get('/api/users', [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message'
        ]);

        $user->delete();
    }

    public function test_show_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $user2 = User::factory()->create();

        $response = $this->actingAs($user)->get('/api/users/' . $user2->id);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'last_name',
            'email',
            'is_admin',
            'created_at',
            'updated_at'
        ]);

        $this->assertEquals($user2->id, $response->json('id'));
        $this->assertEquals($user2->name, $response->json('name'));
        $this->assertEquals($user2->last_name, $response->json('last_name'));
        $this->assertEquals($user2->email, $response->json('email'));
        $this->assertEquals($user2->is_admin, $response->json('is_admin'));

        $user->delete();
        $user2->delete();
    }

    public function test_show_as_authorized_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/api/users/' . $user->id);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'last_name',
            'email',
            'is_admin',
            'created_at',
            'updated_at'
        ]);

        $this->assertEquals($user->id, $response->json('id'));
        $this->assertEquals($user->name, $response->json('name'));
        $this->assertEquals($user->last_name, $response->json('last_name'));
        $this->assertEquals($user->email, $response->json('email'));
        $this->assertEquals($user->is_admin, $response->json('is_admin'));

        $user->delete();
    }

    public function test_show_as_unauthorized_user(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $response = $this->actingAs($user)->get('/api/users/' . $user2->id);

        $response->assertStatus(403);

        $user->delete();
        $user2->delete();
    }

    public function test_store(): void
    {
        $response = $this->post('/api/users', [
            'name' => 'Test',
            'last_name' => 'Test',
            'email' => 'test1234@example.com',
            'password' => 'test1234',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'id',
            'name',
            'last_name',
            'email',
            'created_at',
            'updated_at'
        ]);

        $user = User::find($response->json('id'));

        $this->assertNotNull($user);
        $this->assertEquals($user->name, $response->json('name'));
        $this->assertEquals($user->last_name, $response->json('last_name'));
        $this->assertEquals($user->email, $response->json('email'));
        $this->assertEquals($user->is_admin, $response->json('is_admin'));

        $user->delete();
    }

    public function test_update_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $user2 = User::factory()->create();

        $response = $this->actingAs($user)->put("/api/users/$user2->id", [
            'name' => 'Test',
            'last_name' => 'Test',
            'email' => 'test2@example.com',
            'password' => 'test1234',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'last_name',
            'email',
            'created_at',
            'updated_at'
        ]);

        $user = User::find($response->json('id'));

        $this->assertNotNull($user);
        $this->assertEquals($user->name, $response->json('name'));
        $this->assertEquals($user->last_name, $response->json('last_name'));
        $this->assertEquals($user->email, $response->json('email'));
        $this->assertEquals($user->is_admin, $response->json('is_admin'));

        $user->delete();
    }

    public function test_update_as_authorized_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->put("/api/users/$user->id", [
            'name' => 'Test',
            'last_name' => 'Test',
            'email' => 'test2@example.com',
            'password' => 'test1234',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'last_name',
            'email',
            'created_at',
            'updated_at'
        ]);

        $user = User::find($response->json('id'));

        $this->assertNotNull($user);
        $this->assertEquals($user->name, $response->json('name'));
        $this->assertEquals($user->last_name, $response->json('last_name'));
        $this->assertEquals($user->email, $response->json('email'));
        $this->assertEquals($user->is_admin, $response->json('is_admin'));

        $user->delete();
    }

    public function test_update_as_unauthorized_user(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $response = $this->actingAs($user)->put("/api/users/$user2->id", [
            'name' => 'Test',
            'last_name' => 'Test',
            'email' => 'test2@example.com',
            'password' => 'test1234',
        ]);

        $response->assertStatus(403);

        $user->delete();
        $user2->delete();
    }

    public function test_destroy_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $user2 = User::factory()->create();

        $response = $this->actingAs($user)->delete('/api/users/' . $user2->id, [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(204);

        $user2 = User::find($user2->id);

        $this->assertNull($user2);
        $user->delete();
    }

    public function test_destroy_as_self_user(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->delete('/api/users/' . $user->id, [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(401);

        $user = User::find($user->id);

        $this->assertNotNull($user);
        $user->delete();
    }

    public function test_destroy_as_other_user(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $response = $this->actingAs($user)->delete('/api/users/' . $user2->id, [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(401);

        $user2 = User::find($user2->id);

        $this->assertNotNull($user2);
        $user->delete();
        $user2->delete();
    }
}
