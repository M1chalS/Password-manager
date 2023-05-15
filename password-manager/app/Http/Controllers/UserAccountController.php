<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAccountController extends Controller
{
    public function index()
    {
        $user = User::all();

        return response()->json($user, 200);
    }

    public function store(Request $request)
    {
        $user = User::create($request->validate([
            'name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|unique:users',
            'password' => 'required',
            'is_admin' => 'boolean|nullable'
        ]));

        return response()->json($user, 201);
    }
}
