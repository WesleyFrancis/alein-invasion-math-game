import Alien from "../BIO/alien.js";
import GameInstance from "../BIO/gameInstance.js";
import Question from "../BIO/question.js";
import background from "./background.js";

const level={
    body:document.querySelector("body"),
    gameContainer:document.querySelector(".container"),
    playingField:document.querySelector("#enime"),
    cannon:document.querySelector("#cannon"),
    allien:document.querySelectorAll(".allien"),
    bullets:document.querySelector("#bullet"),
    hit:document.querySelector("#hit"),
    miss:document.querySelector("#miss"),
    save:document.querySelector("#save"),
    left:document.querySelector("#left"),
    shoot:document.querySelector("#shoot"),
    right:document.querySelector("#right"),
    timmer:document.querySelector("#timmer"),
    startGame()//create emimies
    {

    },
    moveEnimies(dist)
    {
        for(let i=0;i<5;i++)
        {
            let ofset=GameInstance.SaveData.currentQuestion.allienRanDist[i];
            this.playingField.children[i].style.marginTop=`${dist-ofset}px`;
        }
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
        GameInstance.SaveData.bulletLocation=location[1]+(this.cannon.offsetWidth/2)-25;//* Set Bullet Location in game instance
        background.playShoot();
    },
    move()
    {
        const bullets=document.querySelectorAll(".bullet");
        let counter=0;
        setInterval(()=>
        {
            bullets.forEach((bul)=>
            {
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
        Bwidth=Bwidth.slice(0,-2);
        Bwidth = parseFloat(Bwidth);

        return  Bwidth/2;//! returns the size of the bullet to make the accuracy of the targeting better.
    },
    getBulletMargin()
    {
        const bullets=document.querySelectorAll(".bullet");
        let Bwidth=bullets[0].style.left;
        return Bwidth.slice(0,-2);
    },
    deleteBullet()
    {
        const bullet=document.querySelectorAll(".bullet");
        bullet[0].remove();
    },
    updateHit()
    {
        if(GameInstance.SaveData.currentLevel==0)
        {
            this.hit.innerHTML = GameInstance.SaveData.hit;
        }
        else{
            this.hit.innerHTML = GameInstance.SaveData.hit2;
        }
        
    },
    updateMiss()
    {
        if(GameInstance.SaveData.currentLevel==0)
        {
            this.miss.innerHTML = GameInstance.SaveData.miss;
        }
        else
        {
            this.miss.innerHTML = GameInstance.SaveData.miss2;
        }
       
    },
    resetCounter()
    {
        this.miss.innerHTML=0;
        this.hit.innerHTML = 0;
    },
    updateTimmer(time)
    {
        this.timmer.innerHTML= time;
    }

}
export default level;