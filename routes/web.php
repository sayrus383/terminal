<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::group(['middleware' => 'auth'], function () {
    Route::group(['as' => 'terminal.'], function () {
        Route::get('/', 'TerminalController@index')->name('index');
        Route::get('/{regNumber}', 'TerminalController@show')->name('show');
        Route::post('/docs/{verifyDoc}/verify', 'TerminalController@verify')->name('verify');
    });
});
