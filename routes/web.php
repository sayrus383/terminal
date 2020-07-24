<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    $terminalService = app(\App\Services\TerminalService::class);
    $terminalService->send();
});
