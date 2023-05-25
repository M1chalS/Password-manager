<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\PasswordResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ShareResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::findOrFail($this->user_id);
        $userShared = User::findOrFail($this->shared_by);

        return [
            "id" => $this->id,
            "user" => new UserResource($user),
            "shared_by" => new UserResource($userShared),
            "password" => new PasswordResource($this->password),
            "created_at" => $this->created_at,
        ];
    }
}
