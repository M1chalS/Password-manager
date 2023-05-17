<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function show(Request $request)
    {
        $user = Auth::user();

        return response(compact('user'), 200);
    }

    public function store(Request $request)
    {
        if (!Auth::attempt($request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]), true)) {
            return response()->json(["error" => [
                "message" => "The provided credentials are incorrect."
            ]], 422);
        }

        /** @var User $user */
        $user = Auth::user();

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'), 200);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json('', 204);
    }
}
