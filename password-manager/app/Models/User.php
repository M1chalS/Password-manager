<?php

namespace App\Models;

use App\Models\Share;
use App\Models\Password;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function passwords(): HasMany
    {
        return $this->hasMany(Password::class, 'user_id');
    }

    public function sharedPasswords(): HasMany
    {
        return $this->hasMany(Share::class, 'user_id');
    }

    public function scopeFilter($query, array $filters): void
    {
        if ($filters['search'] ?? false) {
            $query->where('name', 'like', '%' . request('search') . '%')
                ->orWhere('last_name', 'like', '%' . request('search') . '%')
                ->orWhere('email', 'like', '%' . request('search') . '%');
        }
    }
}
