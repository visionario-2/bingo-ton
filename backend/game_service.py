import random

def generate_card():
    numbers = list(range(1, 76))
    random.shuffle(numbers)

    card = []
    index = 0
    for _ in range(5):
        row = numbers[index:index+5]
        card.append(row)
        index += 5

    # centro livre (bingo clássico)
    card[2][2] = "FREE"
    return card


def generate_draw_sequence():
    numbers = list(range(1, 76))
    random.shuffle(numbers)
    return numbers


def start_game():
    user_card = generate_card()
    draw_sequence = generate_draw_sequence()

    return {
        "user_card": user_card,
        "draw_sequence": draw_sequence
    }
