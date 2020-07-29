<?php

namespace App\Http\Controllers;

use App\Http\Requests\Terminal\RefuseRequest;
use App\Services\TerminalService;
use App\VerifyDoc;
use Carbon\Carbon;
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

    public function verify(VerifyDoc $verifyDoc, Request $request)
    {
        $verifyDoc->update([
            'data'        => $request->except('_token'),
            'verified_at' => Carbon::now(),
            'is_verified' => true,
            'manager_id'  => auth()->id()
        ]);

        $this->terminalService->verifyDoc($verifyDoc);

        return redirect()->route('terminal.index')->with('success', 'Заявка успешно закрыта');
    }

    public function refuse(VerifyDoc $verifyDoc, RefuseRequest $request)
    {
        $response = $this->terminalService->refuseDoc($verifyDoc, $request->input('comments'));

        return redirect()->route('terminal.index')->with('error', 'Заявка отказана');
    }
}
