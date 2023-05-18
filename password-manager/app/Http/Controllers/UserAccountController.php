<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserAccountController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    public function index()
    {
        return response(UserResource::collection(User::all()), 200);
    }

    public function show(User $user)
    {
        return response(new UserResource($user), 200);
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

        $user->password = bcrypt($request->password);
        $user->save();

        return response(new UserResource($user), 201);
    }

    public function update(User $user, Request $request)
    {
        $user->update($request->validate([
            'name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|unique:users,email,' . $user->id,
            'password' => 'required',
            'is_admin' => 'boolean|nullable'
        ]));

        $user->password = bcrypt($request->password);
        $user->save();

        return response(new UserResource($user), 200);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
}
