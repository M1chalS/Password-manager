<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Password;
use Illuminate\Http\Request;
use App\Models\ApplicationPassword;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\Factory;
use Laravel\Sanctum\Sanctum;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Password>
 */
class PasswordFactory extends Factory
{

    // public function configure(): static
    // {
    //     return $this->afterMaking(function (Password $password) {
    //     })->afterCreating(function (Password $password) {
    //         $user = User::factory()->create();

    //         $request = Request::create('/');
    //         $request->setUserResolver(function () use ($user) {
    //             return $user;
    //         });

    //         $password->encrypt($password->password);
    //     });
    // }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->text(fake()->numberBetween(5, 20)),
            'password' => "placeholder",
            'user_id' => fake()->numberBetween(1, 8),
            'type_id' => ApplicationPassword::factory(),
            'type_type' => 'App\Models\ApplicationPassword',
        ];
    }
}
