# Copyright 2017 Mrprocom All Rights Reserved
# This HexChat script allows you to send rainbow-looking text
# Command: /RB [me|msg|print] <message>
# [me|msg|print]: the message type.
# Choose me to send a rainbow action, msg or leave it empty to send a rainbow msg or print to print a rainbow message
# <message>: The message you want to send


import hexchat

# Module information
__module_name__         = "Rainbow"
__module_version__      = "1.0"
__module_description__  = "Enables you to send rainbow messages"
__module_author__       = "Mrprocom"



def unload(userdata):

	# Print a message saying that the script was unloaded
	print(__module_name__ + " plugin unloaded")


def rainbow(s):

	clrs = ["04", "07", "08", "03", "02", "06", "13"]
	current_clr = 0
	rainbow_text = ""
	s = hexchat.strip(s, -1, 1)
	for letter in s:
		# Colourise that letter
		rainbow_text += "\003" + colours[current_clr].zfill(2) + letter
		# Switch to the next colour or go back to the first one
		if current_clr == len(colours) - 1:
			current_clr = 0

		else:
			current_clr += 1

	return rainbow_text


def rb(word, word_eol, userdata):

	if word[1].lower() in ("me", "msg", "print"):
		msg_type = word[1].lower()
		message = rainbow(word_eol[2])

	else:
		msg_type = "msg"
		message = rainbow(word_eol[1])

	if msg_type == "me":
		hexchat.command("me " + message)

	elif msg_type == "msg":
		hexchat.command("say " + message)

	elif msg_type == "print":
		print(message)

	else:
		print("Usage: RB [me|msg|notice] <message>, sends a colourful message")


	return hexchat.EAT_HEXCHAT


# Make a hook that calls rb when running the RB command
hexchat.hook_command("RB", rb, help="Usage: RB [me|msg|notice] <message>, sends a colourful message")
hexchat.hook_unload(unload)

# Print a message saying that the script was loaded
print(__module_name__ + " plugin loaded")
