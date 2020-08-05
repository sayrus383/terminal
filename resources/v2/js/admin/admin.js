webSocket().then(socket => {
    let channel = $('#channel');

    if (channel.length) {
        socket.on(channel.val(), verifyDoc => {
            console.log(verifyDoc);
        });
    }


    // const timer = setTimeout(() => {
    //     socket.off(data.channel);
    //     qrModal.modal('hide');
    //     loader(false);
    // }, 1000 * 60 * 15);
});
