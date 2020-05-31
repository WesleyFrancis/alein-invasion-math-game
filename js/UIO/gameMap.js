import Alien from "../BIO/alien.js";
import GameInstance from "../BIO/gameInstance.js";
import Question from "../BIO/question.js";

const level={
    body:document.querySelector("body"),
    gameContainer:document.querySelector(".container"),
    playingField:document.querySelector("#enime"),
    cannon:document.querySelector("#cannon"),
    allien:document.querySelectorAll(".allien"),
    bullets:document.querySelector("#bullet"),
    hit:document.querySelector("#hit"),
    miss:document.querySelector("#miss"),
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
        Question.CreateQuestion();
        this.playingField.children[0].innerHTML=Question.info.allien[0];
        this.playingField.children[1].innerHTML=Question.info.allien[1];
        this.playingField.children[2].innerHTML=Question.info.allien[2];
        this.playingField.children[4].innerHTML=Question.info.allien[4];
        this.playingField.children[3].innerHTML=Question.info.allien[3];
        this.cannon.innerHTML=Question.info.cannon;
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
        bullet.setAttribute("id","bullet");
        bullet.style.top=`${this.cannon.offsetTop}px`;
        bullet.style.left=`${location[1]+(this.cannon.offsetWidth/2)-25}px`;//TODO 25px should be dynamic for when the bullet is automatically resized
        bullet.style.width='50px';//!should be dynamic
        this.body.appendChild(bullet);
       this.move();
       GameInstance.bulletLocation=location[1]+(this.cannon.offsetWidth/2)-25;//* Set Bullet Location in game instance
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
                    loc-=15;//! bullet speed
                    bul.style.marginTop=`${loc}px`;
                }
            });
            counter+=5;
        },100);
    },
    checkBulletAmt()
    {
        const bullets=document.querySelectorAll(".bullet");
        return bullets.length;
    },
    getBulletLocation()
    {
        const bullets=document.querySelectorAll(".bullet");
        const loc= new Array;
        loc.push(bullets[0].offsetTop);
        return loc;
    },
    getBulletSize()//*size of the bullet to compensate for offset/anchor
    {
        const bullets=document.querySelectorAll(".bullet");
       let Bwidth=bullets[0].style.width;
    //    console.log(bullets[0].style);
       Bwidth=Bwidth.slice(0,2);
       Bwidth = parseFloat(Bwidth);
        
        return  Bwidth/2;//! returns the size of the bullet to make the accuracy of the targeting better.

    },
    deleteBullet()
    {
        const bullet=document.querySelectorAll(".bullet");
        bullet[0].remove();
    },
    updateHit()
    {
        this.hit.innerHTML = GameInstance.hit;
    },
    updateMiss()
    {
        this.miss.innerHTML = GameInstance.miss;
    }
}
export default level;