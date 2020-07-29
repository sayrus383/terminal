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
        if ($verifyDoc->is_verified || $verifyDoc->verified_at || $verifyDoc->manager_id) {
            return redirect()->route('terminal.index')->with('error', 'Заявка уже закрыта');
        }

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
        if ($verifyDoc->is_verified || $verifyDoc->verified_at || $verifyDoc->manager_id) {
            return redirect()->route('terminal.index')->with('error', 'Заявка уже закрыта');
        }

        $verifyDoc->update([
            'verified_at' => Carbon::now(),
            'is_verified' => false,
            'manager_id'  => auth()->id()
        ]);

        $this->terminalService->refuseDoc($verifyDoc, $request->input('comments'));

        return redirect()->route('terminal.index')->with('success', 'Заявка отказана');
    }
}
