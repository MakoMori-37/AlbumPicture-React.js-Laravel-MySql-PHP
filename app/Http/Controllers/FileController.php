<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\AlbumResource;

class FileController extends Controller
{
    public static function create(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|mimes:jpg,png,pdf,xls,txt,csv|max:51200',
        ]);

        if (!$request->file()) {
            return response()->json(['message' => 'No file'], 422);
        }

        $inputs = $request->all();

        $filename = $inputs['filename'] ?? $request->file->getClientOriginalName();
        if (isset($inputs['filename']) && !empty($inputs['filename'])) {
            $filename = $inputs['filename'];
        }

        $originalName = $request->file->getClientOriginalName();
        $name = $filename . '_' . time() . '.' . $request->file->extension();
        $path = '/storage/' . $request->file('file')->storeAs('uploads', $name, 'public');
        $size = $request->file->getSize();
        $type = $request->file->getMimeType();
        $hash = hash_file('sha256', Storage::path('public/uploads/' . $name));

        try {
            $file = File::create([
                'name' => $filename,
                'size' => $size,
                'type' => $type,
                'path' => $path,
                'hash' => $hash,
            ]);
            return new AlbumResource($file);
        } catch (Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], 500);
        }
    }
}
