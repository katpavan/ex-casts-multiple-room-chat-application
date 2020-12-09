defmodule TestWeb.ChatController do
  use TestWeb, :controller
  # Let's also alias our module here to so we can call it without the prefix
  alias Test.Chats

  def show(conn, %{"id" => room}) do
  	messages = Chats.list_messages_by_room(room)

    render(conn, "show.html", room: room, messages: messages)
  end
end