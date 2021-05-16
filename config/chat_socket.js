
module.exports.chatSocket = function(socketServer){
    let io = require('socket.io')(socketServer);
    
    // this is to set the connection once the request is recieved
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        // this is to disconnect the connection
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        // this is for emitting the request to join the room after request is recieved
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            socket.join(data.chatroom);
            // this is to send the request to the server and the other user that ,joined 
            io.in(data.chatroom).emit('user_joined', data);
        });
     // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}