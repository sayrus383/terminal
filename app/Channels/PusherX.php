<?php

namespace App\Channels;

use Illuminate\Notifications\Notification;

class PusherX
{
    /**
     * Send the given notification.
     *
     * @param  mixed  $notifiable
     * @param  Notification  $notification
     * @return void
     */
    public function send($notifiable, Notification $notification)
    {
        $localsocket = 'tcp://127.0.0.1:2206';
        $data = $notification->toMessage($notifiable);
        // соединяемся с локальным tcp-сервером
        $instance = stream_socket_client($localsocket);
        // отправляем сообщение
        $data = serialize($data);
        $data = pack('N', 4 + strlen($data)) . $data;
        fwrite($instance, $data);
        fclose($instance);
    }
}
