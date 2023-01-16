<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = [
        'name',
    ];

    public function pic()
    {
        return $this->hasMany(Picture::class, 'album_id', 'id');
    }
}
