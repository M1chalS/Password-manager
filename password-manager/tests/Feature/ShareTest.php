<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Password;
use App\Models\Share;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ShareTest extends TestCase
{

    public function test_index_for_admin(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $user2 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);
        $share = Share::factory()->create([
            'password_id' => $password->id,
            'user_id' => $user2->id
        ]);

        $response = $this->actingAs($user)->get("/api/shares-admin");

        $response->assertStatus(200);

        $response->assertJsonStructure([
            "*" => [
                'id',
                'password_id',
                'user_id',
                'created_at',
                'updated_at'
            ]
        ]);

        $user->delete();
        $user2->delete();
        $password->delete();
        $share->delete();
    }

    public function test_index_for_admin_as_user(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);
        $share = Share::factory()->create([
            'password_id' => $password->id,
            'user_id' => $user2->id
        ]);

        $response = $this->actingAs($user)->get("/api/shares-admin");

        $response->assertStatus(401);

        $user->delete();
        $user2->delete();
        $password->delete();
        $share->delete();
    }

    public function test_index_as_user(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);
        $share1 = Share::factory()->create([
            'password_id' => $password->id,
            'user_id' => $user2->id
        ]);
        $share2 = Share::factory()->create([
            'password_id' => $password->id,
            'user_id' => $user3->id
        ]);

        $response = $this->actingAs($user2)->get("/api/shares");

        $response->assertStatus(200);
        $response->assertJsonCount(1);

        $response->assertJsonStructure([
            "*" => [
                'id',
                'password_id',
                'user_id',
                'created_at',
                'updated_at'
            ]
        ]);

        $user->delete();
        $user2->delete();
        $user3->delete();
        $password->delete();
        $share1->delete();
        $share2->delete();
    }

    public function test_index_as_unauthorized_user(): void
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);
        $share = Share::factory()->create([
            'password_id' => $password->id,
            'user_id' => $user3->id
        ]);

        $response = $this->actingAs($user2)->get("/api/shares");

        $response->assertStatus(200);
        $response->assertJsonCount(0);

        $user->delete();
        $user2->delete();
        $user3->delete();
        $password->delete();
        $share->delete();
    }

    public function test_share(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user2->id
        ]);

        $response = $this->actingAs($user2)->post("/api/shares", [
            'password_id' => $password->id,
            'user_id' => $user->id
        ]);

        $response->assertStatus(201);

        $share = Share::find($response->json('id'));

        $this->assertEquals($share->password_id, $password->id);
        $this->assertEquals($share->user_id, $user->id);

        $share->delete();
        $password->delete();
        $user->delete();
    }

    public function test_unshare_as_sender(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user2->id
        ]);

        $share = Share::factory()->create([
            'password_id' => $password->id,
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->delete("/api/shares/$share->id");

        $response->assertStatus(204);

        $password->delete();
        $user->delete();
        $user2->delete();
    }

    public function test_unshare_as_reciver(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user2->id
        ]);

        $share = Share::factory()->create([
            'password_id' => $password->id,
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user2)->delete("/api/shares/$share->id");

        $response->assertStatus(204);

        $password->delete();
        $user->delete();
        $user2->delete();
    }
}
