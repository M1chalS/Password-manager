<?php

namespace App\Policies;

use App\Models\Password;
use Illuminate\Auth\Access\Response;
use App\Models\Share;
use App\Models\User;

class SharePolicy
{
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
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Share $share): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Share $share): bool
    {
        $password = Password::findOrFail($share->password_id);

        return $user->id === $share->user_id || $user->id === $password->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Share $share): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Share $share): bool
    {
        return false;
    }
}
