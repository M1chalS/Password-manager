<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Password;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PasswordTest extends TestCase
{
    public function test_index(): void
    {
        $user = User::factory()->create();

        $password = Password::factory()->create();
        $response = $this->actingAs($user)->get('/api/passwords');

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

    public function test_show(): void
    {
        $user = User::factory()->create();
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

    public function test_update(): void
    {
        $user = User::factory()->create();
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

    public function test_destroy(): void
    {
        $user = User::factory()->create();
        $password = Password::factory()->create();

        $response = $this->actingAs($user)->delete("/api/passwords/$password->id");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('passwords', ['id' => $password->id]);

        $user->delete();
    }
}
