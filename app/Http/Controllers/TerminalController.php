<?php

namespace App\Http\Controllers;

use App\Country;
use App\Http\Requests\Terminal\RefuseRequest;
use App\Services\TerminalService;
use App\TfType;
use App\VerifyDoc;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TerminalController extends Controller
{
    private TerminalService $terminalService;

    public function __construct(TerminalService $terminalService)
    {
        $this->terminalService = $terminalService;
    }

    public function index(Request $request)
    {
        $channel = $this->wsChannel('verifyDoc', false);
        $docs = $this->terminalService->getVerifyDocs($request);

        $attachVerifyDocs = VerifyDoc::whereNotNull('attached_at')
            ->where('attached_at', '>=', Carbon::now())
            ->select('reg_number')->pluck('reg_number')->toArray();

        return view('terminal.index', compact('docs', 'channel', 'attachVerifyDocs'));
    }

    public function show($regNumber)
    {
        $verifyDoc = $this->terminalService->getVerifyDoc($regNumber);
        $tfTypes = TfType::all();
        $countries = Country::all();

        if ($verifyDoc->attached_at && $verifyDoc->attached_at->gt(Carbon::now())) {
            return redirect()->route('terminal.index')->with('error', 'Заявка уже  рассматривается');
        }

        $verifyDoc->update([
            'attached_at' => Carbon::now()->addSeconds(30)
        ]);

        return view('terminal.show', compact('verifyDoc', 'tfTypes', 'countries'));
    }

    public function verify(VerifyDoc $verifyDoc, Request $request)
    {
        if ($request->input('IssueDate', null) !== null) {
            $request->merge([
                'IssueDate' => Carbon::parse($request->input('IssueDate'))->format('d.m.Y')
            ]);
        }

        if ($verifyDoc->is_verified || $verifyDoc->verified_at || $verifyDoc->manager_id) {
            return redirect()->route('terminal.index')->with('error', 'Заявка уже закрыта');
        }

        DB::beginTransaction();

        $verifyDoc->update([
            'data'        => $request->except('_token'),
            'verified_at' => Carbon::now(),
            'is_verified' => true,
            'manager_id'  => auth()->id()
        ]);

        $this->terminalService->verifyDoc($verifyDoc);

        DB::commit();

        return redirect()->route('terminal.index')->with('success', 'Заявка успешно закрыта');
    }

    public function refuse(VerifyDoc $verifyDoc, RefuseRequest $request)
    {
        if ($verifyDoc->is_verified || $verifyDoc->verified_at || $verifyDoc->manager_id) {
            return redirect()->route('terminal.index')->with('error', 'Заявка уже закрыта');
        }

        DB::beginTransaction();

        $verifyDoc->update([
            'verified_at' => Carbon::now(),
            'is_verified' => false,
            'manager_id'  => auth()->id()
        ]);

        $this->terminalService->refuseDoc($verifyDoc, $request->input('comments'));

        DB::commit();

        return redirect()->route('terminal.index')->with('success', 'Заявка отказана');
    }

    private function wsChannel(string $channel, bool $single = false, bool $secret = true): string
    {
        $salt = $secret ? uniqid() : 'public';
        $single = $single ? 1 : 0;
        $key = crypt("$channel:$single:$salt", '1rg2kqoh0dpdqsr1kr7r562d1b');

        return "$channel:$single:$salt:$key";
    }
}
