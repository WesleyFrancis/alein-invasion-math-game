import gameInstance from "../BIO/gameInstance.js";

const gameData={
    isMuted:gameInstance.isAudioPlaying,
    enimeLocation:{},//enime location an object literal of aliens as in each ship location from the top of the screen
    timmer:0,
    level:0,

    saveGame()
    {
        // save information to web storage
    },
    fetchGameState()
    {
        //retrive information from webstorage
    }
}