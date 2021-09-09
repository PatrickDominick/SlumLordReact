import readBoard from "./readBoard"

export default function generateBoard(user) {
    const boardData = []
    user.tokens.forEach(token => boardData.push(token.name))

    for (let i=boardData.length; i<25; i++) {
        boardData.push("empty")
    }

    const randomBoard = []

    while (boardData.length > 0) {
        const randomIndex = Math.floor(Math.random() * boardData.length)
        const randomToken = boardData.splice(randomIndex, 1)[0]
        randomBoard.push(randomToken)
    }

    const earnings = readBoard(randomBoard)

    return {
        board: randomBoard,
        earnings
    }
}