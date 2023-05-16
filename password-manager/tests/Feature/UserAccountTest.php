<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserAccountTest extends TestCase
{
    public function test_index(): void
    {
        $response = $this->get('/api/users');

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
    }

    public function test_show(): void
    {
        $user = User::factory()->create();

        $response = $this->get('/api/users/' . $user->id);

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

        $user->delete();
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

    public function test_update(): void
    {
        $user = User::factory()->create();

        $response = $this->put('/api/users/' . $user->id, [
            'name' => 'Test',
            'last_name' => 'Test',
            'email' => 'test@example.com',
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

    public function test_destroy(): void
    {
        $user = User::factory()->create();

        $response = $this->delete('/api/users/' . $user->id);

        $response->assertStatus(204);

        $user = User::find($user->id);

        $this->assertNull($user);
    }
}
