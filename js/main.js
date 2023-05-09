import { TURN,CELL_VALUE,GAME_STATUS } from "./constants.js";
import { getCellElementList,
    getCurrentTurnElement,
    getCellElementAtIdx,
    getGameStatusElement,
    getReplayButtonElement,
    getCellListElement
 } from "./selectors.js";
 import {checkGameStatus} from './utils.js';
 console.log(checkGameStatus(['X', 'O', 'O', '', 'X', '', '', 'O', 'X']));
/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let arrChecked=[];
const toggleTurn = ()=>{
    if(currentTurn == TURN.CROSS){
        currentTurn = TURN.CIRCLE;
    }else{
        currentTurn= TURN.CROSS;
    }
    getCurrentTurnElement().classList.remove(TURN.CROSS,TURN.CIRCLE)
    getCurrentTurnElement().classList.add(currentTurn)
}
const handleClickCell = (cellElement,index)=>{
    const isChecked = cellElement.classList.contains(TURN.CROSS)||cellElement.classList.contains(TURN.CIRCLE);
    if(isChecked) return ;
    cellElement.classList.add(getCurrentTurnElement().getAttribute('class'));
    toggleTurn();
}
const CellElementList =  getCellElementList();
CellElementList.forEach((cellElement,index)=>{
    cellElement.addEventListener('click',()=>{
        handleClickCell(cellElement,index);
    })
})
let isGameEnded = false;
let cellValues = new Array(9).fill("");
const click = document.getElementById('cellList')
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
