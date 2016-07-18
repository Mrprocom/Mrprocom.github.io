# This bot framework is very simple and basic
# After learning how it works, you can then improve it and add commands to it


import socket


# Config
host_port = ("irc.freenode.net", 6667)
nick = "MyBot"
ident = "MyBot"
realname = "MyBot"
channels = ["##MyChannel"]


# Define the socket
irc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Create two messages, one to set the nick and the other one to set the user
nick_msg = "NICK {0}\r\n".format(nick)
user_msg = "USER {0} {1} - - :{2}\r\n".format(ident, nick, realname)


# Connect to the server
irc.connect(host_port)
# Send the two nick and user messages
irc.send(nick_msg.encode("utf-8"))
irc.send(user_msg.encode("utf-8"))


# Join all channels from the channels list
for channel in channels:
    join_msg = "JOIN {0}\r\n".format(channel)
    irc.send(join_msg.encode("utf-8"))


while True:
    # Receive new data
    binary_data = irc.recv(2048)
    # Decode the data
    data = binary_data.decode("utf-8", "ignore")
    words = data.split()
    # Listen for PING and respond with PONG
    if words[0] == "PING":
        irc.send("PONG\r\n".encode("UTF-8"))

    # Print the data
    print(data)
