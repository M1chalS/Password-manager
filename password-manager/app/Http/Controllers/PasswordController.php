<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Password;
use Illuminate\Http\Request;
use App\Models\SshFtpPassword;
use App\Models\ApplicationPassword;
use App\Http\Resources\PasswordResource;
use Illuminate\Validation\ValidationException;

class PasswordController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Password::class, 'password');
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $passwords = Password::whereIn('id', $user->sharedPasswords->map(fn ($password) => $password->password_id))->get();

        return response([
            "personal" => PasswordResource::collection($user->passwords),
            "shared" => PasswordResource::collection($passwords)
        ], 200);
    }

    public function indexAdmin()
    {
        return response(PasswordResource::collection(Password::all()), 200);
    }

    public function show(Password $password)
    {
        // return response($password->type);
        return response(["password" => new PasswordResource($password), "decrypted_password" => $password->decrypt()], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'password' => 'required|string'
        ]);

        $type = $request->type;

        switch ($type) {
            case "application":
                $type = ApplicationPassword::create(
                    $request->validate([
                        'url' => 'required|string'
                    ])
                );
                break;
            case "sshftp":
                $type = SshFtpPassword::create(
                    $request->validate([
                        'host' => 'required|string',
                        'port' => 'required|integer',
                        'username' => 'required|string'
                    ])
                );
                break;
            default:
                throw ValidationException::withMessages([
                    'type' => ['Type does not exist.'],
                ]);
                break;
        }

        $password = $request->user()->passwords()->create([
            'name' => $request->name,
            'password' => $request->password,
            'type_type' => $type->getMorphClass(),
            'type_id' => $type->id
        ]);

        $password->encrypt($password->password);
        $password->save();

        return response(new PasswordResource($password), 201);
    }

    public function update(Password $password, Request $request)
    {
        $password->update($request->validate([
            'name' => 'required|string',
        ]));

        return response(new PasswordResource($password), 200);
    }

    public function destroy(Password $password, Request $request)
    {
        $password->delete();

        return response()->json(null, 204);
    }
}
