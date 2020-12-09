let Chat = {
    init(socket) {
        let path = window.location.pathname.split('/')
        let room = path[path.length - 1]
        let channel = socket.channel('chat:' + room, {})
        channel.join()
            .receive("ok", resp => {
                console.log("Joined successfully", resp)
            })
            .receive("error", resp => {
                console.log("Unable to join", resp)
            })

        this.listenForChats(channel)
    },
    listenForChats(channel) {
        function submitForm() {
            let userName = document.getElementById('user-name').value
            let userMsg = document.getElementById('user-msg').value

            channel.push('shout', {
                name: userName,
                body: userMsg
            })
            document.getElementById('user-name').value = userName
            document.getElementById('user-msg').value = ''
        }

        document.getElementById('chat-form').addEventListener('submit', function(e) {
            e.preventDefault()
            submitForm();
        })

        channel.on('shout', payload => {
            let chatBox = document.querySelector('#chat-box')
            let msgBlock = document.createElement('p')

            msgBlock.insertAdjacentHTML('beforeend', `${payload.name}: ${payload.body}`)
            chatBox.appendChild(msgBlock)
        })
    }
}
export default Chat