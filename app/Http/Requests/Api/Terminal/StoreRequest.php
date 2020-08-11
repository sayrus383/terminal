<?php

namespace App\Http\Requests\Api\Terminal;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'created_at'    => 'required',
            'reg_number'    => 'required|unique:verify_docs',
            'document_type' => 'required',
        ];
    }
}
