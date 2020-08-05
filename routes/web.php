<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('/test', function () {
    $user = \App\User::first();
    $user->notify(new \App\Notifications\PusherX('verifyDoc', ['reg_number' => 'qwfdefwe']));
});

Route::group(['middleware' => 'auth'], function () {
    Route::group(['as' => 'terminal.'], function () {
        Route::get('/', 'TerminalController@index')->name('index');
        Route::get('/{regNumber}', 'TerminalController@show')->name('show');
        Route::post('/docs/{verifyDoc}/verify', 'TerminalController@verify')->name('verify');
        Route::post('/docs/{verifyDoc}/refuse', 'TerminalController@refuse')->name('refuse');
    });
});
