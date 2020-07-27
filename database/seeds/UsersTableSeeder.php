<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email'    => 'sayrus383@mail.ru',
            'password' => bcrypt('123456'),
            'iin'      => '998855020507',
            'role_id'  => User::ROLE_MANAGER
        ]);
    }
}
