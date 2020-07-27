<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    const ROLE_ADMIN = 1;
    const ROLE_MANAGER = 2;

    protected $fillable = [
        'email', 'password', 'iin', 'role_id'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

}
