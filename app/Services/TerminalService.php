<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;

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
                'Content-Type'  => 'application/json; charset=utf-8',
                'Accept'        => 'application/json',
                'Authorization' => 'Basic ' . base64_encode(config('terminal.login') . ':' . config('terminal.password')),
                'Api-key'       => config('terminal.api_key')
            ]
        ]);
    }

    public function send()
    {
        try {
            $response = $this->client->post('insurance/api/get-verify-doc-list/');
            $response = json_decode($response->getBody()->getContents());
            dd($response);
        } catch (BadResponseException $e) {
            dump($e->getResponse()->getStatusCode());
            dd($e->getResponse()->getBody()->getContents());
        }
    }
}
