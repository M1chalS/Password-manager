<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Password extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'password'];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function shares(): HasMany
    {
        return $this->hasMany(Share::class);
    }

    public function encrypt(String $password): bool
    {
        $secret = Config::get('app.secret');

        $random = Str::random(12);

        $letterName = substr(request()->user()->name, 0, 1);
        $letterLastName = substr(request()->user()->last_name, 0, 1);

        $key = Hash::make($secret . $random . $letterName . "4" . $letterLastName);

        try {
            $encryptedPassword = Crypt::encryptString($password, $key);
            $this->password = $encryptedPassword . '.' . $random;
            return true;
        } catch (DecryptException $e) {
            throw new DecryptException("Encryption error");
        }
    }


    public function decrypt(): String
    {
        $secret = Config::get('app.secret');

        $user = User::find($this->user_id);

        $letterName = substr($user->name, 0, 1);
        $letterLastName = substr($user->last_name, 0, 1);

        $random = explode('.', $this->password)[1];

        $key = Hash::make($secret . $random . $letterName . "4" . $letterLastName);

        $password = explode('.', $this->password)[0];

        try {
            return Crypt::decryptString($password, $key);
        } catch (DecryptException $e) {
            throw new DecryptException("Decryption error");
        }
    }
}
