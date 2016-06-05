def irc_to_html(irc_msg):

    boldChar = False
    bold = ["<b>", "</b>"]
    clrChar = False
    clr_a = ["<span style='color: {0};'>", "</span>"]
    clr_b = ["<span style='background: {0}; color: {1};'>", "</span>"]
    italicChar = False
    italic = ["<i>", "</i>"]
    underChar = False
    under = ["<u>", "</u>"]
    clrs = [
        "#D3D7CF", "#2E3436", "#3465A4", "#4E9A06",
        "#CC0000", "#8F3902", "#5C3566", "#CE5C00",
        "#C4A000", "#73D216", "#11A879", "#58A19D",
        "#57799E", "#A04365", "#555753", "#888A85",
        "#D3D7CF", "#2E3436", "#3465A4", "#4E9A06",
        "#CC0000", "#8F3902", "#5C3566", "#CE5C00",
        "#C4A000", "#73D216", "#11A879", "#58A19D",
        "#57799E", "#A04365", "#555753", "#888A85"
    ]
    back_clr_re = r"^(1[0-5]|0?[0-9]),(1[0-5]|0?[0-9])"
    for_clr_re = r"^(1[0-5]|0?[0-9])"
    loop = 0
    order = []
    output = ""

    while loop < len(irc_msg):
        char = irc_msg[loop]
        if char == "\002":
            if boldChar:
                boldChar = False
                order.pop(order.index("bold"))
                output += bold[1]

            else:
                boldChar = True
                order.append("bold")
                output += bold[0]

        elif char == "\035":
            if italicChar:
                italicChar = False
                order.pop(order.index("italic"))
                output += italic[1]

            else:
                italicChar = True
                order.append("italic")
                output += italic[0]

        elif char == "\037":
            if underChar:
                underChar = False
                order.pop(order.index("under"))
                output += under[1]

            else:
                underChar = True
                order.append("under")
                output += under[0]


        elif char == "\017":
            for fmt in order[::-1]:
                if fmt == "bold":
                    boldChar = False
                    output += bold[1]

                elif fmt == "clr":
                    clrChar = False
                    output += clr_a[1]

                elif fmt == "italic":
                    italicChar = False
                    output += italic[1]

                else:
                    underChar = False
                    output += under[1]

            order = []

        elif char == "\003":
            match_for = re.match(for_clr_re, irc_msg[loop + 1:loop + 3])
            match_back = re.match(back_clr_re, irc_msg[loop + 1:loop + 6])
            if match_back:
                for_clr = match_back.group(1).rstrip("0")
                back_clr = match_back.group(2).rstrip("0")
                if not for_clr:
                    for_clr = "0"

                if not back_clr:
                    back_clr = "0"

                for_clr = int(for_clr)
                back_clr = int(back_clr)

                if clrChar:
                    order.pop(order.index("clr")).append("clr")
                    output += clr_b[1] + clr_b[0].format(
                        clrs[back_clr],
                        clrs[for_clr]
                    )

                else:
                    clrChar = True
                    order.append("clr")
                    output += clr_b[0].format(
                        clrs[back_clr],
                        clrs[for_clr]
                    )

                loop += match_back.span()[1]

            elif match_for:
                for_clr = match_for.group(1).rstrip("0")
                if not for_clr:
                    for_clr = "0"

                for_clr = int(for_clr)

                if clrChar:
                    order.pop(order.index("clr")).append("clr")
                    output += clr_a[1] + clr_a[0].format(clrs[for_clr])

                else:
                    clrChar = True
                    order.append("clr")
                    output += clr_a[0].format(clrs[for_clr])

                loop += match_for.span()[1]

            else:
                if clrChar:
                    clrChar = False
                    output += clr_a[1]

        else:
            output += char

        loop += 1

    for fmt in order[::-1]:
        if fmt == "bold":
            boldChar = False
            output += bold[1]

        elif fmt == "clr":
            clrChar = False
            output += clr_a[1]

        elif fmt == "italic":
            italicChar = False
            output += italic[1]

        else:
            underChar = False
            output += under[1]

    return output
