import Alien from "../BIO/alien.js";
import GameInstance from "../BIO/gameInstance.js";

const level={
    body:document.querySelector("body"),
    gameContainer:document.querySelector(".container"),
    playingField:document.querySelector("#enime"),
    cannon:document.querySelector("#cannon"),
    allien:document.querySelectorAll(".allien"),
    bullets:document.querySelectorAll(".bullet"),
    startGame()//create emimies
    {

    },
    moveEnimies(dist,ship)
    {
        this.playingField.children[ship].style.marginTop=`${dist}px`;

    },
    moveCannon(num){

            this.cannon.style.marginLeft=`${num}px`;
        
    },
    showQuestions(){
        this.playingField.children[0].innerHTML=GameInstance.question(0);
        this.playingField.children[1].innerHTML=GameInstance.question(1);
        this.playingField.children[2].innerHTML=GameInstance.question(2);
        this.playingField.children[3].innerHTML=GameInstance.question(3);
        this.playingField.children[4].innerHTML=GameInstance.question(4);
        this.cannon.innerHTML=GameInstance.cannon();
    },
    CreateBullet()
    {

        const location=[];
        location.push(this.cannon.offsetTop);//location from teh top of the screen
        location.push(this.cannon.getBoundingClientRect().x);
        location.push(this.cannon.offsetWidth);//width of the cannon container

        //todo: spawn at cannon distance from left location[1];
        const bullet=document.createElement("div");
        bullet.setAttribute("class","bullet");
        bullet.style.top=`${this.cannon.offsetTop}px`;
        bullet.style.left=`${location[1]+(this.cannon.offsetWidth/2)-25}px`;
        console.log();
        this.body.appendChild(bullet);
       this.move();
    },
    move()
    {
        const bullets=document.querySelectorAll(".bullet");
        let counter=0;
        setInterval(()=>{
            bullets.forEach((bul)=>{
                let loc=bul.style.marginTop;
                loc=loc.slice(0, -2);
                if(loc*-1>window.innerHeight)
                {
                    bul.remove();
                }
                else{
                    
                    
                    loc-=5;
                    console.log(`${loc}  -- `);

                    bul.style.marginTop=`${loc}px`;
                
                }
            });
            counter+=5;
        },100);
    }

}
export default level;