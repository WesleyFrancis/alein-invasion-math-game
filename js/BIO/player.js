class Player{// hold all the informaion relative to the player session

    name;

    constructor(name)
    {
        this.name=name;
    }
    setPlayer(playerName)
    {
        this.name=playerName;
    }
    getPlayer()
    {
        return this.name;
    }
}
export default Player