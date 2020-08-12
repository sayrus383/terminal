<?php

namespace App\Http\Requests\Terminal;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class VerifyRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge($this->verifyDoc->data);

        if ($this->input('IssueDate', null) !== null) {
            $this->merge([
                'IssueDate' => Carbon::parse($this->input('IssueDate'))->format('d.m.Y')
            ]);
        }

        if ($this->input('Birthdate', null) !== null) {
            $this->merge([
                'Birthdate' => Carbon::parse($this->input('Birthdate'))->format('d.m.Y')
            ]);
        }

        if ($this->input('ExpDate', null) !== null) {
            $this->merge([
                'ExpDate' => Carbon::parse($this->input('ExpDate'))->format('d.m.Y')
            ]);
        }

        if ($this->input('Year', null) !== null) {
            $this->merge([
                'Year' => (int)$this->input('Year')
            ]);
        }

        if ($this->input('Type', null) !== null) {
            $this->merge([
                'Type' => (int)$this->input('Type')
            ]);
        }

        if ($this->input('SexID', null) !== null) {
            $this->merge([
                'SexID' => (int)$this->input('SexID')
            ]);
        }

        if ($this->input('CountryID', null) !== null) {
            $this->merge([
                'CountryID' => (int)$this->input('CountryID')
            ]);
        }
    }

    public function rules()
    {
        return [];
    }
}
