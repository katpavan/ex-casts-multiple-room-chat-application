let Chat = {
  init(socket) {
    let path = window.location.pathname.split('/')
    let room = path[path.length -1]
    let channel = socket.channel('chat:' + room, {})
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  }
}
export default Chat