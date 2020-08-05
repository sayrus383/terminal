<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VerifyDoc extends Model
{
    protected $fillable = [
        'reg_number',
        'document_type',
        'doc_base64',
        'data',
        'verified_at',
        'is_verified',
        'attached_at',
        'manager_id',
        'image_path'
    ];

    protected $casts = [
        'verified_at' => 'date',
        'attached_at' => 'date',
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
