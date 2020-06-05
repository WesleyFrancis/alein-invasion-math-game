import GameInstance from "../BIO/gameInstance.js";
const EndGame={
    name:document.querySelector("#name"),
    difficultyLvl:document.querySelector("#difficultyLvl"),
    gameState:document.querySelector("#gameState"),
    hits1:document.querySelector("#hits1"),
    hits2:document.querySelector("#hits2"),
    miss1:document.querySelector("#miss1"),
    miss2:document.querySelector("#miss2"),
    populate()
    {
        if(GameInstance.getSaved().currentLevel<2)
        {   
            gameState.innerHTML="GAME OVER";
        }
        else
        {
            gameState.innerHTML="CONGRATS!! Math Wizard";
        }
        const saved=GameInstance.getSaved();
        
        this.name.innerHTML=saved.playerName;
        this.difficultyLvl.innerHTML=saved.difficultyLevel;
        this.hits1.innerHTML= saved.hit;
        this.hits2.innerHTML=saved.hit2;
        this.miss1.innerHTML=saved.miss;
        this.miss2.innerHTML=saved.miss2;
    }
}
export default EndGame;