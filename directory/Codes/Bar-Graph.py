def bar_graph(y_values, char, height, x_axis, label):

    output = []
    multiply = height / max(y_values)
    max_x_len = len(str(len(y_values)))
    max_y_len = len(str(max(y_values)))
    prefix = " " * max_x_len + "   "

    if not x_axis:
        for number in y_values:
            new_item = char * round(number * multiply)
            if label:
                new_item += " [{0}]".format(y_values[i])

            output.append(new_item)

    else:
        for i in range(len(y_values)):
            index = str(i + 1).zfill(max_x_len) + " | "
            new_item = index + (char * round(y_values[i] * multiply))
            if label:
                new_item += " [{0}]".format(y_values[i])

            output.append(new_item)

    return output