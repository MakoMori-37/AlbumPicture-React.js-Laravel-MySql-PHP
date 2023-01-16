<?php

namespace App\Http\Controllers;

use App\Picture;
use Illuminate\Http\Request;
use App\Http\Resources\AlbumResource;

class PictureController extends Controller
{
    public static function create(Request $request)
    {
        $validated = $request->validate([
            'desc' => 'required',
            'albumId' => 'required',
            'fileId' => 'required',
        ]);
        $inputs = $request->all();

        try {
            $pic = Picture::create([
                'desc' => $inputs['desc'],
                'file_id' => $inputs['fileId'],
                'album_id' => $inputs['albumId'],
            ]);
            return new AlbumResource($pic);
        } catch (Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], 500);
        }
    }

    public static function update(Request $request, $id)
    {
        $validated = $request->validate([
            'desc' => 'required',
            'fileId' => 'required',
            'albumId' => 'required',
        ]);
        $inputs = $request->all();

        $pic = Picture::find($id);

        if (is_null($pic)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        try {
            $pic->desc = $inputs['desc'];
            $pic->album_id = $inputs['albumId'];
            $pic->file_id = $inputs['fileId'];
            $pic->save();

            return new AlbumResource($pic);
        } catch (Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], 500);
        }
    }

    public static function delete(Request $request, $id)
    {
        $pic = Picture::find($id);

        if (is_null($pic)) {
            return response()->json(['message' => 'Not found'], 404);
        }

        try {
            $pic->delete();
            return new AlbumResource($pic);
        } catch (Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], 500);
        }
    }
}
