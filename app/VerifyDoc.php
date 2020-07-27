<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VerifyDoc extends Model
{
    protected $fillable = [
        'reg_number',
        'document_type',
        'name',
        'surname',
        'type_doc',
        'pa_number',
        'birthdate',
        'sex_id',
        'country_id',
        'is_resident',
        'barcode',
        'pers_number',
        'doc_base64',
        'issue_date',
        'created_at',
        'expired_at',
        'verified_at',
        'is_verified',
        'manager_id'
    ];

    protected $casts = [
        'issue_date'  => 'date',
        'birthdate'   => 'date',
        'expired_at'  => 'date',
        'verified_at' => 'date'
    ];

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
