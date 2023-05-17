<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    public function index()
    {
        return response()->json(Password::all(), 200);
    }

    public function show(Password $password)
    {
        return response()->json($password, 200);
    }
}
