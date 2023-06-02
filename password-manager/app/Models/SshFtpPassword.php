<?php

namespace App\Models;

use App\Models\Password;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SshFtpPassword extends Model
{
    protected $fillable = ['host', 'port', 'username'];

    protected $table = 'sshftp_passwords';

    public function password()
    {
        return $this->morphOne(Password::class, 'type');
    }
}
