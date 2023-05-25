<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

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
            'email' => 'required|unique:users,email',
            'password' => 'nullable',
            'is_admin' => 'boolean|nullable'
        ]));

        if ($request->password) {
            $user->password = bcrypt($request->password);
            $user->save();
        }

        return response(new UserResource($user), 200);
    }

    public function updatePassword(User $user, Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'password' => 'required|confirmed',
        ]);

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => [
                    'old_password' => ['The old password is incorrect.']
                ]
            ], 422);
        }

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
