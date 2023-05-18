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
    public function test_share(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);

        $this->actingAs($user)->get("/api/passwords/$password->id");

        $response = $this->actingAs($user2)->post("/api/shares", [
            'password_id' => $password->id
        ]);

        $response->assertStatus(201);

        $share = Share::find($response->json('id'));

        $this->assertEquals($share->password_id, $password->id);
        $this->assertEquals($share->user_id, $user2->id);

        $share->delete();
        $password->delete();
        $user->delete();
    }

    public function test_un_share(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $password = Password::factory()->create([
            'user_id' => $user->id
        ]);

        $this->actingAs($user)->get("/api/passwords/$password->id");

        $response1 = $this->actingAs($user2)->post("/api/shares", [
            'password_id' => $password->id
        ]);

        $share_id = $response1->json('id');

        $response2 = $this->actingAs($user)->delete("/api/shares/$share_id");

        $response2->assertStatus(204);

        $password->delete();
        $user->delete();
    }
}
