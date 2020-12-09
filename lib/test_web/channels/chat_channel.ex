defmodule TestWeb.ChatChannel do
  use TestWeb, :channel

  # Let's also add an alias for our Chats module so we can call it without the prefix.
  alias Test.Chats

  def join("chat:" <> _room, _payload, socket) do
    {:ok, socket}
  end

  def handle_in("shout", payload, socket) do
  	#  let’s take our payload, update it with its room, and then save it to the database.

  	# Since the topic is stored as a field on our socket, we can pattern match on it to get the room. 
  	"chat:" <> room = socket.topic

  	# Then let's add our room to our payload. 
  	payload = Map.merge(payload, %{"room" => room})

  	# We can create our message from our payload using the Chats context module create_message function.
  	Chats.create_message(payload)

    broadcast socket, "shout", payload
    {:noreply, socket}
  end

end
