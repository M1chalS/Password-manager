<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Password;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class PasswordPolicy
{
    use HandlesAuthorization;

    public function before(?User $user, $ability)
    {
        if ($user?->is_admin) {
            return true;
        }
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Password $password): bool
    {
        return $user->id === $password->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Password $password): bool
    {
        return $user->id === $password->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Password $password): bool
    {
        return $user->id === $password->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Password $password): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Password $password): bool
    {
        return false;
    }
}
