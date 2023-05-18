<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
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

        $password = Password::factory()->create();
        $response = $this->actingAs($user)->get('/api/passwords', [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'password',
                'created_at',
                'updated_at'
            ]
        ]);

        $password->delete();
        $user->delete();
    }

    public function test_index_as_user(): void
    {
        $user = User::factory()->create([
            'is_admin' => false
        ]);

        $password = Password::factory()->create();
        $response = $this->actingAs($user)->get('/api/passwords', [], [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $user->createToken('main')->plainTextToken
        ]);

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message'
        ]);

        $password->delete();
        $user->delete();
    }

    public function test_show_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $password = Password::factory()->create();

        $response = $this->actingAs($user)->get("/api/passwords/$password->id");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'password',
            'created_at',
            'updated_at'
        ]);

        $password->delete();
        $user->delete();
    }

    public function test_show_as_authorized_user(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->get("/api/passwords/$password->id");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'password',
            'created_at',
            'updated_at'
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
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'id',
            'name',
            'password',
            'created_at',
            'updated_at'
        ]);

        $password = Password::find($response->json('id'));

        $this->assertNotNull($password);
        $this->assertEquals($response->json('name'), $password->name);
        $this->assertEquals($response->json('password'), $password->password);

        $user->delete();
        $password->delete();
    }

    public function test_update_as_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $password = Password::factory()->create();

        $response = $this->actingAs($user)->put("/api/passwords/$password->id", [
            'name' => 'new name',
            'password' => 'password4321'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'password',
            'created_at',
            'updated_at'
        ]);

        $password->delete();
        $user->delete();
    }

    public function test_update_as_authorized_user(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->put("/api/passwords/$password->id", [
            'name' => 'new name',
            'password' => 'password4321'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'password',
            'created_at',
            'updated_at'
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
    }

    public function test_destroy_as_unauthorized_user(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create();

        $response = $this->actingAs($user)->delete("/api/passwords/$password->id");

        $response->assertStatus(403);
        $this->assertDatabaseHas('passwords', ['id' => $password->id]);

        $user->delete();
    }

    public function test_decrypt(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/api/passwords', [
            'name' => 'Test',
            'password' => 'test1234',
        ]);

        $password = Password::find($response->json('id'));

        $this->assertEquals('test1234', $password->decrypt());
    }
}
