<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth'], function () {
    Route::get('/');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
