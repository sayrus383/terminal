<?php

require_once __DIR__ . '/vendor/autoload.php';

use Workerman\Connection\TcpConnection;
use Workerman\Worker;

class Channel
{
    public $single = false;
    public $name = '';
    /** @var TcpConnection[] */
    public $connections = [];
    /** @var Channels */
    public $channels;

    public function __construct(Channels $channels, $name, $single)
    {
        $this->channels = $channels;
        $this->single = $single;
        $this->name = $name;
    }

    public function addConnection(TcpConnection $connection)
    {
        $this->connections[$connection->id] = $connection;
    }

    public function delConnection(TcpConnection $connection)
    {
        if ($this->single) $this->channels->delete($this); // если канал-одиночка, удаляем весь канал
        else unset($this->connections[$connection->id]);   // удаляем только connection из списка подписантов
    }
}

class Connections
{
    /** @var Channel[][] */
    protected $list = [];

    /**
     * @param  TcpConnection  $connection
     * @return Channel[]
     */
    public function channels(TcpConnection $connection)
    {
        return $this->list[$connection->id] ?? [];
    }

    public function add(TcpConnection $connection)
    {
        $this->list[$connection->id] = [];
    }

    public function delete(TcpConnection $connection)
    {
        $channels = $this->channels($connection);
        // убираем подписчика из тех каналов, на которые он подписан
        foreach ($channels as $channel) {
            $channel->delConnection($connection);
        }
        unset($this->list[$connection->id]);
    }
}

class Channels
{
    /** @var Channel[] */
    protected $list = [];

    /**
     * @param  string  $name
     * @return Channel
     */
    public function get(string $name)
    {
        return $this->list[$name] ?? null;
    }

    public function add(Channel $channel)
    {
        $this->list[$channel->name] = $channel;
    }

    public function delete(Channel $channel)
    {
        unset($this->list[$channel->name]);
    }

    public function clear()
    {
        $this->list = [];
    }
}

function is_access(string $channel)
{
    static $secret = '1rg2kqoh0dpdqsr1kr7r562d1b';
    [$channel, $single, $salt, $key] = array_pad(explode(':', $channel), 4, '');
    return (crypt("$channel:$single:$salt", $secret) === $key) ? [$channel, $single] : false;
}

class Socket
{
    /** @var Connections */
    public $connections;
    /** @var Channels */
    public $channels;

    public function __construct()
    {
        $this->connections = new Connections;
        $this->channels = new Channels;
    }
}
$socket = new Socket;

// создаём ws-сервер, к которому будут подключаться все наши пользователи
$worker = new Worker("http://172.17.1.117:8001/socket");
// создаём обработчик, который будет выполняться при запуске ws-сервера
$worker->onWorkerStart = function () use ($socket) {
    // создаём локальный tcp-сервер, чтобы отправлять на него сообщения из кода нашего сайта
    $tcp = new Worker("frame://127.0.0.1:2206");
    // создаём обработчик сообщений, который будет срабатывать,
    // когда на локальный tcp-сокет приходит сообщение
    $tcp->onMessage = function (TcpConnection $conn, $data) use ($socket) {
        if (!$data = unserialize($data)) return;

        // находим канал и отправляем всем подписанным на него сообщение
        /** @var Channel $channel */
        if ($channel = $socket->channels->get($data['channel'])) {
            foreach ($channel->connections as $connection) {
                /** @var TcpConnection $connection */
                $connection->send(json_encode($data, JSON_UNESCAPED_UNICODE));
            }
        }
    };
    $tcp->listen();
};

$worker->onConnect = function (TcpConnection $connection) use ($socket) {
    $socket->connections->add($connection);

    $connection->onMessage = function (TcpConnection $connection, $data) use ($socket) {
        $data = json_decode($data, true);
        $channel = $data['channel'] ?? false;
        $status = $data['status'] ?? null;

        if (!$status) return;
        if (!$channel = ($channel ? is_access($channel) : false)) {
            return;
        }

        [$channelName, $single] = $channel;
        echo "Channel $channelName \n";

        $channel = $socket->channels->get($channelName);
        $status = $status === 'on';

        if ($status) { // если происходит подписка
            if (!$channel) { // если канала ещё не существует, тогда создаём
                $channel = new Channel($socket->channels, $channelName, $single);
                $socket->channels->add($channel);
            }
            // добавляем в канал подписчика
            $channel->addConnection($connection);
        } else { // отписка
            if ($channel) { // если канал существует
                if ($channel->single) {
                    // если канал-одиночка, удаляем весь канал
                    $socket->channels->delete($channel);
                } else {
                    // удаляем только подписчика из канала
                    $channel->delConnection($connection);
                }
            }
        }
    };
    // $connection->onWebSocketConnect = function (TcpConnection $connection) use ($ws_worker, $channels) {};
};

$worker->onClose = function (TcpConnection $connection) use ($socket) {
    // удаляем $connection при отключении пользователя из общего списка
    $socket->connections->delete($connection);
};

// Run worker
Worker::runAll();
