# Copyright 2017 Mrprocom All Rights Reserved
# This HexChat script automatically replaces buffextras messages with HexChat text events


import hexchat
import re

__module_name__        = "Pretty Buffextras"
__module_version__     = "1.0"
__module_description__ = "Replaces *buffextras messages with HexChat text events"
__module_author__      = "Mrprocom"


# How to add more messages
# The key is for the regex. Group the parts of the buffextras message
# that should be arguments of the hexchat.emit_print() function
# The key is for the emit_print function arguments, it starts with the event name
# The numbers there indicate the order of the grouped strings from the regex match
msg_types = {
	r"^(\S+)!\S+@\S+ is now known as (\S+)$":  ("Change Nick", 0, 1),
	r"^(\S+)!(\S+@\S+) joined$": ("Join", 0, "<channel>", 1),
	r"^(\S+)!(\S+@\S+) parted with message: \[\]$": ("Part", 0, 1, "<channel>"),
	r"^(\S+)!(\S+@\S+) parted with message: \[(.+)\]$": ("Part with Reason", 0, 1, "<channel>", 2),
	r"^(\S+)!(\S+@\S+) quit with message: \[(.*)\]$": ("Quit", 0, 2, 1),
	r"^(\S+)!\S+@\S+ kicked (\S+) Reason: \[(.*)\]$": ("Kick", 0, 1, "<channel>", 2),
	r"^(\S+)!(\S+@\S+)? changed the topic to: (.+)$": ("Topic Change", 0, 2, "<channel>")
}

modes = {
	"+b": "Channel Ban",
	"+e": "Channel Exempt",
	"+I": "Channel INVITE",
	"+k": "Channel Set Key",
	"+l": "Channel Set Limit",
	"+o": "Channel Operator",
	"+q": "Channel Quiet",
	"+v": "Channel Voice",
	"-b": "Channel UnBan",
	"-e": "Channel Remove Exempt",
	"-I": "Channel Remove Invite",
	"-k": "Channel Remove Keyword",
	"-l": "Channel Remove Limit",
	"-o": "Channel DeOp",
	"-q": "Channel UnQuiet",
	"-v": "Channel DeVoice"
}


def unload(userdata):

	# Print a message saying that the script was unloaded
	print(__module_name__ + " plugin unloaded")


def buffextras_msg(word, word_eol, userdata, attributes):

	# Check if the message was sent by *buffextras, then check what type of message it was
	if hexchat.strip(word[0]) == "*buffextras":
		for msg_reg, args in msg_types.items():
			match = re.match(msg_reg, word[1])
			if match:
				# Replace all numbers with their match.groups()[index]
				args = [match.groups()[i] if isinstance(i, int) else hexchat.get_info("channel") if i == "<channel>" else i for i in args]
				hexchat.emit_print(*args, time=attributes.time)
				return hexchat.EAT_HEXCHAT

		# Check if the message is a mode change
		if re.match(r"^\S+(!\S+@\S+)? set mode: ((-|\+)?\w+)+ .*$", word[1]):
			setter = word[1].split("!")[0]
			targets = word[1].split()[4:]
			minus = word[1].split()[3].startswith("-")
			for char in word[1].split()[3]:
				if char == "+":
					minus = False

				elif char == "-":
					minus = True

				else:
					mode_sign = "-" if minus else "+"
					mode_char = mode_sign + char
					if char in "beIkloqv":
						mode_target = targets[0]
						del targets[0]

					else:
						mode_target = hexchat.get_info("channel")

					if mode_char in modes:
						hexchat.emit_print(modes[mode_char], setter, mode_target, time=attributes.time)

					else:
						hexchat.emit_print("Channel Mode Generic", setter, mode_sign, char, mode_target, time=attributes.time)

		return hexchat.EAT_HEXCHAT


# Make a hook that calls buffextras_msg when receiving a channel message or a highlight
hexchat.hook_print_attrs("Channel Message", buffextras_msg)
hexchat.hook_print_attrs("Channel Msg Hilight", buffextras_msg)
hexchat.hook_unload(unload)

# Print a message saying that the script was loaded
print(__module_name__ + " plugin loaded")
