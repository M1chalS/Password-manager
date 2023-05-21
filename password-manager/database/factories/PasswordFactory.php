<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Password>
 */
class PasswordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->userName(),
            'password' => "eyJpdiI6ImxpZWlESnMvUGN5eG1Td3YrT0JZNHc9PSIsInZhbHVlIjoielBNWGRJSk45RTUwSTViczQ5SW9NZz09IiwibWFjIjoiZTc0NTgxZjQyNTAxNmVhZjljZTAxMTc3OWIzNmFlNTE4MGM4Yjg4Y2I0MDJhYTc5NmUzODNjM2U3ZjYyMjJkZSIsInRhZyI6IiJ9.i2jC5OFOn79v",
            'user_id' => fake()->numberBetween(1, 8),
        ];
    }
}
