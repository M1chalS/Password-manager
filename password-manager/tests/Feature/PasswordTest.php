<?php

namespace Tests\Feature;

use App\Models\Password;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PasswordTest extends TestCase
{
    public function test_index(): void
    {
        $password = Password::factory()->create();
        $response = $this->get('/api/passwords');

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
    }

    public function test_show(): void
    {
        $password = Password::factory()->create();

        $response = $this->get("/api/passwords/$password->id");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'password',
            'created_at',
            'updated_at'
        ]);

        $password->delete();
    }

    public function test_store(): void
    {
        $response = $this->post('/api/passwords', [
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

        $password->delete();
    }

    public function test_update(): void
    {
        $password = Password::factory()->create();

        $response = $this->put("/api/passwords/$password->id", [
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
    }

    public function test_destroy(): void
    {
        $password = Password::factory()->create();

        $response = $this->delete("/api/passwords/$password->id");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('passwords', ['id' => $password->id]);
    }
}
