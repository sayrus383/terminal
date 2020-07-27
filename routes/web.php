<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth'], function () {
    Route::group(['as' => 'terminal.'], function () {
        Route::get('/', 'TerminalController@index')->name('index');
        Route::get('/{regNumber}', 'TerminalController@show')->name('show');
    });
});

Auth::routes();
