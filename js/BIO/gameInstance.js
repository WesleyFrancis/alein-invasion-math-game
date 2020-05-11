const GameInstance ={
    //all the information a game would need to have
    maxEnime:5,
    isAudioPlaying:false,
    cannonLocation:0,
    alienLocation:[],
    question:{},// question is an object that holds informatio pertainig to the whole game question

    startGame()
    {
        //reset elements and fetch a new question
    },
    pauseGmae()
    {
        //pause all elements where they are in time
    },
    resumeGame()
    {
        //restart game using the saved state from the pause to continue from where they left off
    },
    endGame()
    {
        //do what game end should do show score etc
    },
    saveGame()
    {
        //tell game data to save game state
    }
}
export default GameInstance;