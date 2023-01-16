<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class AlbumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    // public function toArray($request)
    // {
    //     return parent::toArray($request);
    // }

    public function toArray($request)
    {
        $data = parent::toArray($request);
        return AlbumResource::convertSnakeToCamel($data);
    }

    public static function convertSnakeToCamel($list)
    {
        return AlbumResource::convertSnakeToCamelRecursive($list);
    }

    public static function convertSnakeToCamelRecursive($list)
    {
        $newList = [];
        foreach ($list as $key => $value) {
            $newList[Str::camel($key)] = $value;
            if (is_array($value)) {
                $newList[Str::camel($key)] = AlbumResource::convertSnakeToCamelRecursive($value);
            }
        }

        return $newList;
    }
}
