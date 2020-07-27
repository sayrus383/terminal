<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Support\Facades\Log;

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

            return json_decode($response->getBody()->getContents());
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
}
