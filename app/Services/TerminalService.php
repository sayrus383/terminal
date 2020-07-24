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
                'Content-Type' => 'application/json',
                'Accept'       => 'application/json'
            ]
        ]);
    }

    public function send()
    {
        try {
            $response = $this->client->post('insurance/api/get-verify-doc-list/');
            dd($response->getBody()->getContents());
        } catch (BadResponseException $e) {
            dd($e->getResponse()->getBody()->getContents());
        }
    }
}
