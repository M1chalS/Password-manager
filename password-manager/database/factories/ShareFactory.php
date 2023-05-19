<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Share>
 */
class ShareFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'password_id' => \App\Models\Password::factory()->create()->id,
            'user_id' => \App\Models\User::factory()->create()->id,
            'shared_by' => \App\Models\User::factory()->create()->id,
        ];
    }
}
