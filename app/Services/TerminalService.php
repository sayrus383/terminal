<?php

namespace App\Services;

use App\VerifyDoc;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TerminalService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri'        => config('terminal.url'),
            'timeout'         => config('terminal.timeout'),
            'connect_timeout' => config('terminal.connect_timeout'),
            'headers'         => [
                'Content-Type'  => 'application/json',
                'Accept'        => 'application/json',
                'Authorization' => 'Basic ' . base64_encode(config('terminal.login') . ':' . config('terminal.password')),
                'Api-key'       => config('terminal.api_key')
            ]
        ]);
    }

    protected function send(string $url, array $params)
    {
        try {
            $response = $this->client->post($url, [
                'json' => $params
            ]);

            $response = json_decode($response->getBody()->getContents());

            if (isset($response->error) || isset($response->warning)) {
                Log::error((array)$response);
                abort(404);
            }

            return $response;
        } catch (BadResponseException $e) {
            Log::error($e->getResponse()->getBody()->getContents());
        }
    }

    public function getVerifyDocs(Request $request): LengthAwarePaginator
    {
        $page = $request->input('page') ?: 1;
        $response = $this->send('insurance/api/get-verify-doc-list', [
            'page' => $page
        ]);

        return new LengthAwarePaginator(collect($response->data), $response->total_pages, app()->isProduction() ? 30 : 2, $page);
    }

    public function getVerifyDoc(string $regNumber): VerifyDoc
    {
        return VerifyDoc::where('reg_number', $regNumber)->firstOr(function () use ($regNumber) {
            $doc = $this->send('insurance/api/get-verify-doc', [
                'reg_number' => $regNumber
            ]);

            return VerifyDoc::create([
                'reg_number'    => $doc->reg_number,
                'document_type' => $doc->document_type,
                'data'          => $doc->data,
                'created_at'    => Carbon::parse($doc->created_at),
                'image_path'    => $this->saveBase64($doc->doc_base64)
            ]);
        });
    }

    public function verifyDoc(VerifyDoc $verifyDoc, string $comment = null)
    {
        return $this->send('insurance/api/set-verify-doc', [
            'success'    => true,
            'reg_number' => $verifyDoc->reg_number,
            'comment'    => $comment,
            'data'       => $verifyDoc->data
        ]);
    }

    protected function saveBase64(string $base64)
    {
        $destination = 'images/' . date('Y-m-d');

        $imageName = Str::random(10) . '_' . time() . '.png';
        Storage::disk('public')->put($destination . '/' . $imageName, base64_decode($base64));

        return "/storage/$destination/" . $imageName;
    }
}
