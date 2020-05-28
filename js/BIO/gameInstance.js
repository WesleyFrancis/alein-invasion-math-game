import gameUI from "../UIO/gameMap.js";
const GameInstance ={
    //!all the information a game would need to have
    isAudioPlaying:false,
    cannonLocation:0,
    alienLocation:[],
    question:{
        sel:145,
        selr:2
    },//* question is an object that holds informatio pertainig to the whole game question

    startGame()
    {
        //TODO : reset elements and fetch a new question
    },
    pauseGmae()
    {
        //TODO : pause all elements where they are in time
    },
    resumeGame()
    {
        //TODO :restart game using the saved state from the pause to continue from where they left off
    },
    endGame()
    {
        //TODO :do what game end should do show score etc
    },
    saveGame()
    {
        //TODO :tell game data to save game state
    },
    QuestionGame(index)
    {   
        return this.question.sel;
    },
    cannon()
    {

    },
    TrackBullet()
    {
  const checker = setInterval(()=>{
           if(gameUI.checkBulletAmt()>0)
           {
         //  console.log(gameUI.getBulletLocation());//bullet location
            if(gameUI.iSOverlaping(1))
            {
                clearInterval(checker);
                console.log("Explode");
            }
         
           }
        },100)
    }
}
export default GameInstance;