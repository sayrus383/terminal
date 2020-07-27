<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VerifyDoc extends Model
{
    const TYPE_ID = 'ID';
    const TYPE_VU = 'VU';
    const TYPE_SRTS = 'SRTS';

    protected $fillable = [
        'reg_number',
        'document_type',
        'doc_base64',
        'data',
        'verified_at',
        'is_verified',
        'manager_id',
        'image_path'
    ];

    protected $casts = [
        'verified_at' => 'date',
        'data'        => 'array'
    ];

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function getPrettyCreatedAtAttribute()
    {
        return $this->created_at->format('H:i d/m/Y');
    }
}
