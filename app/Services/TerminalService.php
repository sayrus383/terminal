<?php

namespace App\Services;

use App\VerifyDoc;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
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

    public function getVerifyDocs(int $page)
    {
        return $this->send('insurance/api/get-verify-doc-list', [
            'page' => $page
        ]);
    }

    public function getVerifyDoc(string $regNumber)
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

    protected function saveBase64(string $base64)
    {
        $destination = 'images/' . date('Y-m-d');

        $imageName = Str::random(10) . '_' . time() . '.png';
        Storage::disk('public')->put($destination . '/' . $imageName, base64_decode($base64));

        return "/storage/public/$destination/" . $imageName;
    }
}
