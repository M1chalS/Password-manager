<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MainTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_not_found_working(): void
    {
        $response = $this->get('/api/not-registered-route');

        $response->assertStatus(404);
        $response->assertJson([
            'message' => 'Route Not Found',
        ]);
    }
}
