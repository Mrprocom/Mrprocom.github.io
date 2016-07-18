# This HexChat script automatically joins any channel you were invited to
# Add channels you do not want to automatically join after getting invited to to the blacklist list


import hexchat

# Module information
__module_name__         = "Join on Invite"
__module_version__      = "1.0"
__module_description__  = "Makes you join the channel you were invited to automatically"
__module_author__       = "Mrprocom"



# Add channels you do not want to automatically join after getting invited to this list (case-sensitive)
blacklist = [
    "#freenode"
]


def unload(userdata):

    # Print a message saying that the script was unloaded
    print(__module_name__ + " was unloaded")


def join(word, word_eol, userdata):

    # Check if the channel is blacklisted
    if word[0] not in blacklist:
        hexchat.command("join " + word[0])


# Make a hook that calls join when receiving an invite
hexchat.hook_print("Invited", join)
hexchat.hook_unload(unload)

# Print a message saying that the script was loaded
print(__module_name__ + " was loaded")
