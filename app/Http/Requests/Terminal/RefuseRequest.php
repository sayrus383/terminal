<?php

namespace App\Http\Requests\Terminal;

use App\Http\Requests\BaseRequest;

class RefuseRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'comments' => 'required|string|max:255'
        ];
    }
}
