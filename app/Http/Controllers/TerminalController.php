<?php

namespace App\Http\Controllers;

use App\Services\TerminalService;
use Illuminate\Http\Request;

class TerminalController extends Controller
{
    private TerminalService $terminalService;

    public function __construct(TerminalService $terminalService)
    {
        $this->terminalService = $terminalService;
    }

    public function index()
    {
        $docs = $this->terminalService->getVerifyDocs(1);
        dd($docs);
    }
}
