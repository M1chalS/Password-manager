<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;
use App\Http\Resources\PasswordResource;

class PasswordController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Password::class, 'password');
    }

    public function index()
    {
        return response(PasswordResource::collection(Password::all()), 200);
    }

    public function show(Password $password)
    {
        return response(new PasswordResource($password), 200);
    }

    public function store(Request $request)
    {
        $password = $request->user()->passwords()->create(
            $request->validate([
                'name' => 'required|string',
                'password' => 'required|string'
            ])
        );

        $password->encrypt($password->password);
        $password->save();

        return response(new PasswordResource($password), 201);
    }

    public function update(Password $password, Request $request)
    {
        $password->update($request->validate([
            'name' => 'required|string',
            'password' => 'required|string'
        ]));

        $password->encrypt($password->password);
        $password->save();

        return response(new PasswordResource($password), 200);
    }

    public function destroy(Password $password, Request $request)
    {
        $password->delete();

        return response()->json(null, 204);
    }
}
