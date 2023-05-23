<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\Cast\Array_;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    public function test_login_with_correct_credentials(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
            ],
            'token'
        ]);

        $user->delete();
    }

    public function test_login_with_incorrect_credentials(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => 'badpassword'
        ]);

        $response->assertStatus(302);

        $user->delete();
    }

    public function test_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $token = "Bearer " . $response->json('token');

        $response = $this->delete('/api/logout', [], [
            'Accept' => 'application/json',
            'Authorization' => $token
        ]);

        $response->assertStatus(204);
        $user->delete();
    }
}
