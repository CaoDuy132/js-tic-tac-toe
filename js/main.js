import { TURN,CELL_VALUE,GAME_STATUS } from "./constants.js";
import { getCellElementList,
    getCurrentTurnElement,
    getCellElementAtIdx,
    getGameStatusElement,
    getReplayButtonElement,
    getCellListElement
 } from "./selectors.js";
 import {checkGameStatus} from './utils.js';
/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let gameStatus = GAME_STATUS.PLAYING;
let cellValues = new Array(9).fill("");
const toggleTurn = ()=>{
    if(currentTurn == TURN.CROSS){
        currentTurn = TURN.CIRCLE;
    }else{
        currentTurn= TURN.CROSS;
    }
    getCurrentTurnElement().classList.remove(TURN.CROSS,TURN.CIRCLE)
    getCurrentTurnElement().classList.add(currentTurn)
}
function updateGameStatus(newGameStatus) {
    gameStatus = newGameStatus;
  
    const gameStatusElement = getGameStatusElement();
    if (gameStatusElement) gameStatusElement.textContent = newGameStatus;
  }
  
  function showReplayButton() {
    const replayButton = getReplayButtonElement();
    if (replayButton) replayButton.classList.add("show");
  }
  
  function hideReplayButton() {
    const replayButton = getReplayButtonElement();
    if (replayButton) replayButton.classList.remove("show");
  }
  
  function highlightWinCells(winPositions) {
    if (!Array.isArray(winPositions) || winPositions.length !== 3) {
      throw new Error("Invalid win positions");
    }
  
    for (const position of winPositions) {
      const cell = getCellElementAtIdx(position);
      console.log(cell);
      if (cell) cell.classList.add("win");
    }
  }
  
const handleClickCell = (cellElement,index)=>{
    const isChecked = cellElement.classList.contains(TURN.CROSS)||cellElement.classList.contains(TURN.CIRCLE);
    if(isChecked) return ;
    cellElement.classList.add(getCurrentTurnElement().getAttribute('class'));
    // update cellValues
    cellValues[index] =
    currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;
    toggleTurn();
      // check game status
  const game = checkGameStatus(cellValues);
  switch (game.status) {
    case GAME_STATUS.ENDED: {
      updateGameStatus(game.status);
      showReplayButton();
      break;
    }

    case GAME_STATUS.X_WIN:
    case GAME_STATUS.O_WIN: {
      updateGameStatus(game.status);
      showReplayButton();
      highlightWinCells(game.winPositions);
      break;
    }
    default:
    // playing
  }
}
const CellElementList =  getCellElementList();
const btnReplay = document.getElementById("replayGame");
btnReplay.addEventListener('click',()=>{
    CellElementList.forEach(item=>{
        cellValues = cellValues.map(() => "");
        item.className = "";
        updateGameStatus(GAME_STATUS.PLAYING);
        hideReplayButton();
    })
})
CellElementList.forEach((cellElement,index)=>{
    cellElement.addEventListener('click',()=>{
        handleClickCell(cellElement,index);
    })
})

/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */
