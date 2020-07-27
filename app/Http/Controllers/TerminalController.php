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

        return view('terminal.index', compact('docs'));
    }

    public function show($regNumber)
    {
        $doc = $this->terminalService->getVerifyDoc($regNumber);

        dd($doc);
    }
}
