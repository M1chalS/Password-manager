<?php

namespace App\Models;

use App\Models\Password;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ApplicationPassword extends Model
{
    use HasFactory;

    protected $fillable = ['url'];

    public function password()
    {
        return $this->morphOne(Password::class, 'type');
    }
}
