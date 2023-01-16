<?php

namespace App\Http\Controllers;

use App\Album;
use Illuminate\Http\Request;
use App\Http\Resources\AlbumResource;

class AlbumController extends Controller
{
    public static function getList(Request $request)
    {
        $searchWord = '%' . $request->input('searchWord', '') . '%';
        $query = Album::query();
        $query->where('name', 'like', $searchWord);
        $list = $query->with(['pic'])->get();

        return AlbumResource::collection($list);
    }

    public static function getDetail(Request $request, $id)
    {
        $detail = Album::with('pic.file')->find($id);

        if (is_null($detail)) {
            return response()->json(['message' => 'Album not found'], 404);
        }

        return new AlbumResource($detail);
    }

    public static function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
        ]);
        $inputs = $request->all();

        $albumWithSameName = Album::where('name', '=', $inputs['name'])->first();

        if (!is_null($albumWithSameName)) {
            return response()->json(['message' => 'Album already exists'], 422);
        }

        try {
            $album = Album::create([
                'name' => $inputs['name'],
            ]);
            return new AlbumResource($album);
        } catch (Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], 500);
        }
    }

    public static function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required',
        ]);
        $inputs = $request->all();

        $album = Album::find($id);

        if (is_null($album)) {
            return response()->json(['message' => 'Album not found'], 404);
        }

        try {
            $album->name = $inputs['name'];
            $album->save();

            return new AlbumResource($album);
        } catch (Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], 500);
        }
    }

    public static function delete(Request $request, $id)
    {
        $album = Album::find($id);

        if (is_null($album)) {
            return response()->json(['message' => 'Album not found'], 404);
        }

        try {
            $album->delete();
            return new AlbumResource($album);
        } catch (Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], 500);
        }
    }
}
