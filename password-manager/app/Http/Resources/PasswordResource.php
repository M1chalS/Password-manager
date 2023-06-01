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

        $type_name = "";
        $type = $this->type;

        switch (get_class($type)) {
            case 'App\Models\ApplicationPassword':
                $type_name = "application";
                break;
            case 'App\Models\SshFtpPassword':
                $type_name = "sshftp";
                break;
        }

        $type = [
            "id" => $type->id,
            "type" => $type_name,
            "type_data" => $type->toArray()
        ];

        return [
            "id" => $this->id,
            "name" => $this->name,
            "user" => new UserResource($user),
            "type" => $type,
            "created_at" => $this->created_at,
            "updated_at" => $this->created_at,
        ];
    }
}
