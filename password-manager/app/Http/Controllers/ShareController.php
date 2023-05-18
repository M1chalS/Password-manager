<?php

namespace App\Http\Controllers;

use App\Models\Share;
use Illuminate\Http\Request;

class ShareController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'password_id' => 'required|integer',
        ]);

        $share = Share::create([
            'password_id' => $request->password_id,
            'user_id' => $request->user()->id
        ]);

        return response()->json($share, 201);
    }

    public function destroy(Share $share, Request $request)
    {
        $share->delete();

        return response()->json(null, 204);
    }
}
