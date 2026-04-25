<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@charity.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'manager@charity.com'],
            [
                'name' => 'Manager User', 
                'password' => bcrypt('password'),
                'role' => 'moderator',
            ]
        );
    }
}