class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        // this is for setting up the conection request
        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){  // this is to check user exist or not
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;
        // this is to set the connection with the other user
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

            // this is to emit the request to join the chatroom
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });
            // this is when user joined the chatroom
            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){            // this is to handle the send button if it is clicked
            let msg = $('#chat-message-input').val();   // then it will store themsg value of input box

            if (msg != ''){ // if msg is not empty
                self.socket.emit('send_message', {   // then we are sending the emit request to the observer with details
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });
        
        //  this is for receiving the msg 
        self.socket.on('receive_message', function(data){       // once the msg receieved the callback function    
            console.log('message received', data.message);


            let newMessage = $('<li>');          // this is to createt the list as given in chatbox.ejs

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){     // this is tp check the data rreceieved is by other email or self id from the server
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {         // apending into the span
                'html': data.message
            }));

            newMessage.append($('<sub>', {          // this is for adding the subscript email for the one who send it
                'html': data.user_email
            }));

            newMessage.addClass(messageType);           

            $('#chat-messages-list').append(newMessage);        // this is to append msg into the list of msgs
        })
    }
}