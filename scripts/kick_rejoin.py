# Copyright 2017 Mrprocom All Rights Reserved
# This HexChat script automatically joins the channel you were kicked from
# Change the value of the delay variable to the time you want to wait before rejoining in milliseconds
# Add channels you do not want to automatically join after getting kicked from in the blacklist list


import hexchat

# Module information
__module_name__         = "Kick Rejoin"
__module_version__      = "1.0"
__module_description__  = "Makes you rejoin the channel you were kicked from"
__module_author__       = "Mrprocom"



# Time it takes to rejoin in milliseconds
delay = 1000
# Add channels you do not want to rejoin automatically after getting kicked
blacklist = [
	"#freenode"
]

def unload(userdata):

	# Print a message saying that the script was unloaded
	print(__module_name__ + " plugin unloaded")


def kicked_check(word, word_eol, userdata):

	# This function rejoins channel
	def rejoin(userdata):

		# Check if the channel is not blacklisted
		if channel not in blacklist:
			hexchat.command("join " + channel)
    
	# Set the value of channel to the channel you were kicked from
	channel = word[1]
	# Run rejoin after <delay> millisecond
	hexchat.hook_timer(delay, rejoin)


# Make a hook that calls kicked_check after getting kicked
hexchat.hook_print("You Kicked", kicked_check)
hexchat.hook_unload(unload)

# Print a message saying that the script was loaded
print(__module_name__ + " plugin loaded")
