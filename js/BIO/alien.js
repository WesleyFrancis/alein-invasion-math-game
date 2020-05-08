class Enime{
    size;//number -> dimention of the allien (based on screen size)
    number;//number -> assigned
    speed;//number -> speed of decent
    hitCannon;//Bool -> if cannon is hit
    isAlive;//Bool -> is killed or not

    constructor(size,number,speed)
    {
        this.size=size;
        this.number=number;
        this.speed=speed;
        this.isAlive=true;
    }

    spawnAlien(){
        const allien=document.createElement("div");
            allien.setAttribute("class","allien");
        const NumberCanon=document.createElement("h6");
        NumberCanon.innerHTML=this.number;
        allien.appendChild(NumberCanon);
        return allien;
    }

}
export default Enime