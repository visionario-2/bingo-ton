def check_bingo(card, marked):
    grid = [card[i*5:(i+1)*5] for i in range(5)]

    def complete(line):
        return all(num in marked for num in line)

    for row in grid:
        if complete(row):
            return True

    for col in range(5):
        if complete([grid[row][col] for row in range(5)]):
            return True

    if complete([grid[i][i] for i in range(5)]):
        return True

    if complete([grid[i][4-i] for i in range(5)]):
        return True

    return False
