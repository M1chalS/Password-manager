<?php

namespace App\Http\Controllers;

use App\Models\Share;
use App\Models\Password;
use App\Models\User;
use Illuminate\Http\Request;
use Mockery\Generator\StringManipulation\Pass\Pass;

class ShareController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Share::class, 'share');
    }

    public function index(Request $request)
    {
        $shares = Share::where('user_id', $request->user()->id)->get();

        return response()->json($shares, 200);
    }

    public function indexAdmin(Request $request)
    {
        $shares = Share::all();

        return response()->json($shares, 200);
    }

    public function show(Share $share)
    {
        return response()->json($share, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'password_id' => 'required|integer|exists:passwords,id',
            'user_id' => 'required|integer|exists:users,id'
        ]);

        $password = Password::findOrFail($request->password_id);

        if ($request->user()->id !== $password->user_id) {
            return response()->json([
                'message' => 'You are not the owner of this password'
            ], 403);
        }

        if ($request->user()->id === $request->user_id) {
            return response()->json([
                'message' => 'You cannot share a password with yourself'
            ], 403);
        }

        if (Share::where('password_id', $request->password_id)->where('user_id', $request->user_id)->exists()) {
            return response()->json([
                'message' => 'You have already shared this password with this user'
            ], 403);
        }

        $share = Share::create([
            'password_id' => $request->password_id,
            'user_id' => $request->user_id,
            'shared_by' => $request->user()->id
        ]);

        return response()->json($share, 201);
    }

    public function destroy(Share $share, Request $request)
    {
        $share->delete();

        return response()->json(null, 204);
    }
}
