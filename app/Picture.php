<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    protected $fillable = [
        'desc',
        'file_id',
        'album_id',
    ];

    public function album()
    {
        return $this->hasOne(Album::class, 'id', 'album_id');
    }
    
    public function file()
    {
        return $this->hasOne(File::class, 'id', 'file_id');
    }
}
