<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Policies\UserPolicy;
use App\Policies\PasswordPolicy;
use Mockery\Generator\StringManipulation\Pass\Pass;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Password::class => PasswordPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
