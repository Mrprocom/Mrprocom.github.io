# Copyright 2017 Mrprocom All Rights Reserved
# This HexChat script provides a geoip command to locate someone from their IP address
# Command: /GEOIP <IP>
# Example: /GEOIP 123.123.123.123


import urllib.request
import hexchat
import json

# Module information
__module_name__         = "GeoIP"
__module_version__      = "1.0"
__module_description__  = "Gives the location of the given IP address"
__module_author__       = "Mrprocom"



def unload(userdata):

	# Print a message saying that the script was unloaded
	print(__module_name__ + " plugin unloaded")


def geoip(word, word_eol, userdata):

	if word[1].split():
		try:
			jo = urllib.request.urlopen("http://freegeoip.net/json/" + word[1].split()[0]).read().decode("UTF-8")
			jo = json.loads(jo)
			print("[{0}] Location: {1}, {2} ({3})".format(jo["ip"], jo["country_name"], jo["city"], jo["time_zone"]))

		except urllib.error.HTTPError:
			print("Error: Invalid IP.")

	else:
		print("Error: Not enough arguments.")

	return hexchat.EAT_HEXCHAT


# Make a hook command for "GEOIP" that runs geoip
hexchat.hook_command("GEOIP", geoip, help="Usage: GEOIP <IP>, gives the location of the given IP address")
hexchat.hook_unload(unload)

# Print a message saying that the script was loaded
print(__module_name__ + " plugin loaded")
