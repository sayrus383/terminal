<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Terminal\StoreRequest;
use App\Services\TerminalService;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;
use App\Notifications\PusherX;

class TerminalController extends Controller
{
    public function store(StoreRequest $request, TerminalService $terminalService, User $user)
    {
        $terminalService->getVerifyDoc($request->input('reg_number'));

        $user->notify(new PusherX('channelVerifyDoc', [
            "reg_number"    => $request->input('reg_number'),
            "created_at"    => Carbon::parse($request->input('created_at'))->format('d.m.Y H:i:s'),
            "document_type" => trans('fields.' . $request->input('document_type')),
            "url"           => route('terminal.show', $request->input('reg_number'))
        ]));

        return response()->noContent();
    }
}
