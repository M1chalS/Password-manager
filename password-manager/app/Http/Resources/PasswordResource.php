<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PasswordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::findOrFail($this->user_id);

        return [
            "id" => $this->id,
            "name" => $this->name,
            "user" => new UserResource($user),
            "created_at" => $this->created_at,
        ];
    }
}
