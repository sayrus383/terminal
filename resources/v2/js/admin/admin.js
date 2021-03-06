(function ($) {
    $(document).ready(function () {
        let counter = 1;

        class WChannel {
            /**
             * @param {WSocket} socket
             * @param {string} name
             * @param {function} fn
             */
            constructor(socket, name, fn) {
                this.id = counter++;
                this.socket = socket;
                this.name = name;
                const [channel] = name.split(':');
                this.channel = channel;
                this.fn = fn;
            }

            off() {
                const i = this.socket.channels.findIndex((channel) => {
                    return channel.id === this.id;
                });
                if (i !== -1) this.socket.channels.slice(i, 1);
            }
        }

        /**
         * @param {WSocket} socket
         * @param {{delay: int, reconnectLimit: int}} options
         */
        const reconnect = function (socket, options) {
            let pinganator;
            const ping = connection => connection.send('{"channel":"ping"}');

            const connect = () => {
                if (options.reconnectLimit === 0) return;

                const connection = new WebSocket(socket.url);

                connection.addEventListener('open', () => {
                    socket.connection = connection;
                    socket.channels.forEach((channel) => {
                        subscribe(connection, channel.name, 'on');
                    });
                    // раз в 30 секунд пингуем сокет, чтобы прокси не закрыл соединение
                    pinganator = setInterval(() => ping(connection), 30000);
                });
                connection.addEventListener('error', () => {
                    setTimeout(connect, options.delay);
                    clearInterval(pinganator);
                });
                connection.addEventListener('close', e => {
                    socket.connection = null;
                    clearInterval(pinganator);
                    if (e.code > 1001) {
                        setTimeout(connect, options.delay);
                    }
                });
                connection.addEventListener('message', response => {
                    const data = JSON.parse(response.data);
                    socket.channels.forEach((channel) => {
                        if (channel.channel === data.channel) {
                            channel.fn(data.data);
                        }
                    });
                });

                options.reconnectLimit--;
            };

            connect();
        };

        /**
         * @param {WebSocket} connection
         * @param {string} channelName
         * @param {string} status
         */
        const subscribe = (connection, channelName, status) => {
            const data = {
                channel: channelName,
                status,
            };
            connection.send(JSON.stringify(data));
        };

        class WSocket {
            /**
             * @param {string} url
             */
            constructor(url) {
                this.connection = null;
                this.url = url;
                /** @type WChannel[] */
                this.channels = [];
            }

            /**
             * @param {{delay: int, reconnectLimit: int}} options
             */
            connect(options) {
                if (this.connection) return;

                reconnect(this, Object.assign({
                    delay: 3000,
                    reconnectLimit: 60,
                }, options ? options : {}));

                return this;
            }

            disconnect() {
                if (!this.connection) return;

                this.connection.close(1000);
                this.connection = null;
            }

            /**
             * @param {string} channelName
             * @param {function} fn
             */
            on(channelName, fn) {
                const channel = new WChannel(this, channelName, fn);
                this.channels.push(channel);

                if (this.connection) subscribe(this.connection, channel.name, 'on');

                return channel;
            }

            /**
             * @param {string} channelName
             */
            off(channelName) {
                if (this.connection) subscribe(this.connection, channelName, 'off');

                [channelName] = channelName.split(':');
                this.channels = this.channels.filter(channel => channel.channel !== channelName);
            }
        }

        /** @type WSocket wsocket */
        let wsocket;

        function webSocket() {
            if (!wsocket) {
                wsocket = new WSocket(`ws://${location.host}:8001/socket`);
                wsocket.connect({
                    delay: 3000,
                    reconnectLimit: 60,
                });
            }

            return {
                then(fn) {
                    fn(wsocket);
                    return this;
                }
            };
        }

        let channelVerifyDoc = $('#channelVerifyDoc');
        if (channelVerifyDoc.length) {
            let verifyDocs = $('#verifyDocs');

            webSocket().then(socket => {
                socket.on(channelVerifyDoc.val(), verifyDoc => {
                    verifyDocs.append('                                            <tr role="row" class="odd" id="verifyDocs">\n' +
                        '                                                <td>' + verifyDoc.document_type + '</td>\n' +
                        '                                                <td>' + verifyDoc.created_at + '</td>\n' +
                        '\n' +
                        '                                                <td class="text-right">\n' +
                        '                                                    <a class="btn btn-primary"\n' +
                        '                                                          id="open-'+ verifyDoc.reg_number +'"' +
                        '                                                       href="' + verifyDoc.url + '">\n' +
                        '                                                        Посмотреть' +
                        '                                                    </a>\n' +
                        '                                                </td>\n' +
                        '                                            </tr>')
                });
            });
        }

        let channelOpen = $('#channelOpen');
        if (channelOpen.length) {
            webSocket().then(socket => {
                socket.on(channelOpen.val(), verifyDoc => {
                    $('#open-' + verifyDoc.reg_number).removeClass('btn-primary').addClass('btn-warning').text('Рассматривается...');
                });
            });
        }

        let channelDelete = $('#channelDelete');
        if (channelDelete.length) {
            webSocket().then(socket => {
                socket.on(channelDelete.val(), verifyDoc => {
                    $('#open-' + verifyDoc.reg_number).parent().parent().remove();
                });
            });
        }
    });
})(jQuery)
