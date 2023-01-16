<?php

use App\Http\Controllers\AlbumController as ApiAlbumController;
use App\Http\Controllers\FileController as ApiFileController;
use App\Http\Controllers\PictureController as ApiPictureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/album')->group(function () {
    Route::get('/', [ApiAlbumController::class, 'getList']);
    Route::post('/', [ApiAlbumController::class, 'create']);
    Route::get('/{id}', [ApiAlbumController::class, 'getDetail']);
    Route::put('/{id}', [ApiAlbumController::class, 'update']);
    Route::delete('/{id}', [ApiAlbumController::class, 'delete']);
});

Route::prefix('/file')->group(function () {
    Route::post('/', [ApiFileController::class, 'create']);
});

Route::prefix('/pic')->group(function () {
    Route::post('/', [ApiPictureController::class, 'create']);
    Route::put('/{id}', [ApiPictureController::class, 'update']);
    Route::delete('/{id}', [ApiPictureController::class, 'delete']);
});
