import Player from "../BIO/player.js";

class PlayerData{
    playerName;

    constructor(name)
    {
        this.playerName=name;
    }

    savePlayer(playerNme)
    {
        this.playerName=playerNme;
        localStorage.setItem("playerName",playerNme);
    }
    getplayer()
    {
        return localStorage.getItem("playerName");
    }

}
export default PlayerData;