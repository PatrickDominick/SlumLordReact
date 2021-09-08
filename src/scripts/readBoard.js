export default function readBoard(board) {
    const getAdjacentTokens = index => {
        const left = board[index - 1]
        const right = board[index +1]
        const up = board[index -5]
        const down = board[index +5]

        return [left, right, up, down]
    }

    let earnings = 0

    board.forEach(token => {
        const adjacentTokens = getAdjacentTokens(index)
        switch(token) {
            case "Coin": 
                earnings += 2
                break
            case "Cat": 
                
                if (adjacentTokens.includes("Dog")) {
                    earnings += 3
                }
                else {
                    earnings += 1
                }
                break
            case "Dog": 
                
                if (adjacentTokens.includes("Cat")) {
                    earnings += 3
                }
                else {
                    earnings += 1
                }
                break
            case "Bee": 
                
                if (adjacentTokens.includes("Flower")) {
                    earnings += 3
                }
                else {
                    earnings += 1
                }
                break
            case "Flower": 
                
                if (adjacentTokens.includes("Bee")) {
                    earnings += 3
                }
                else {
                    earnings += 1
                }
                break
        }
    })

    return earnings
}