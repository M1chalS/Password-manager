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
}
