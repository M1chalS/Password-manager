<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PhpParser\Node\Expr\Cast\Array_;

class AuthTest extends TestCase
{
    public function test_login(): void
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
                'created_at',
                'updated_at'
            ],
            'token'
        ]);

        $user->delete();
    }

    // public function test_logout(): void
    // {
    //     $user = User::factory()->create();

    //     $token = $user->createToken('main')->plainTextToken;

    //     $response = $this->actingAs($user)->delete('/api/logout', [], [
    //         'Accept' => 'application/json',
    //         'Authorization' => 'Bearer ' . $token
    //     ]);

    //     $response->assertStatus(204);
    //     $user->delete();
    // }
}
