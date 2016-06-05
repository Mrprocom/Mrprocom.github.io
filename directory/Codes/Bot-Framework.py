import socket


host_port = ("irc.freenode.net", 6667)
nick = "MyBot"
ident = "MyBot"
realname = "MyBot"
channels = ["##Mrprocom", "##asdfffa"]


irc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
nick_msg = "NICK {0}\r\n".format(nick)
user_msg = "USER {0} {1} - - :{2}\r\n".format(ident, nick, realname)


irc.connect(host_port)
irc.send(nick_msg.encode("utf-8"))
irc.send(user_msg.encode("utf-8"))


for channel in channels:
  join_msg = "JOIN {0}\r\n".format(channel)
  irc.send(join_msg.encode("utf-8"))


while True:
  binary_data = irc.recv(2048)
  data = binary_data.decode("utf-8", "ignore")
  words = data.split()
  if words[0] == "PING":
    irc.send("PONG\r\n".encode("UTF-8"))

  print(data)
