<?php

namespace App\Http\Controllers;

use App\Services\TerminalService;
use App\VerifyDoc;
use Illuminate\Http\Request;

class TerminalController extends Controller
{
    private TerminalService $terminalService;

    public function __construct(TerminalService $terminalService)
    {
        $this->terminalService = $terminalService;
    }

    public function index(Request $request)
    {
        $docs = $this->terminalService->getVerifyDocs($request);

        return view('terminal.index', compact('docs'));
    }

    public function show($regNumber)
    {
        $verifyDoc = $this->terminalService->getVerifyDoc($regNumber);

        return view('terminal.show', compact('verifyDoc'));
    }

    public function verify(VerifyDoc $verifyDoc)
    {
        $this->terminalService->verifyDoc($verifyDoc);

        return redirect()->route('terminal.index')->with('success', 'Заявка успешно закрыта');
    }
}
