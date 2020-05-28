// param myParam----------------import stuff--------------
import StartScreenUI from "./UIO/startScreen.js";
import BackgroundUI from "./UIO/background.js";
import playerData from "./DAO/playerData.js";
import gameMapUI from "./UIO/gameMap.js";
import MenuUI from "./UIO/menu.js";
import GameInstance from "./BIO/gameInstance.js";
import bullet from "./BIO/bullet.js";
const app=
{
    startscrn: document.querySelector("#startBody"),
    mainscrns: document.querySelector("#MainMenu"),
    gameMap: document.querySelector("#gameMap"),

    init()
    {
        if(this.startscrn!=null)
        {
            this.startScreen();
        }
        else if(this.mainscrns!=null)
        {
            this.mainMenu();
        }
        else if(this.gameMap!=null)
        {
            this.gameMapr();
        }
        //update background regardless of webpage
            let index=1;
            setInterval((e) => {
               BackgroundUI.updateBackground(index);

                index++;
                if(index>=708)//708 width f ackground image to fake looping
                {
                    index=0;
                }
            }, 100);
        document.addEventListener("DOMContentLoaded",()=>{
        BackgroundUI.createAudio();
        BackgroundUI.updateAudio(GameInstance.isAudioPlaying);//global state of the game information -> gameState.audio
        this.resizeComponents();//!resize on Document load

       });
       BackgroundUI.mute.addEventListener("click",()=>{
            BackgroundUI.toggleAudio();
        });
        
        
        window.addEventListener('resize',()=>{
            this.resizeComponents();//!resize on page resize

        });
        GameInstance.TrackBullet();
    },

    getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
      },
    convertPX(pixels)
    {
        return pixels.slice(0,-2);///substring(0, distance.length-2); //gameMapUI.cannon.style.marginLeft; //! remove the px character
    },
    startScreen()
    {
        const plyrDta=new playerData();
        StartScreenUI.nextButton.addEventListener("click",()=>{
            //load next page
            //save player info to player class and session
            if(StartScreenUI.userName.value!='')
            {
                plyrDta.savePlayer(StartScreenUI.userName.value);
                window.location ="html/menu.html";
            }
            else
            {
                alert("enter something"); // to be replaced with message class and dymamic messages
            }
        });
    },
    mainMenu()
    {
        MenuUI.setName(`Hi ${localStorage.getItem("playerName")}`);
        MenuUI.playBtn.addEventListener("click",()=>{
            window.location="../html/gameMap.html";
       });

    },
    gameMapr()//game level script
    {
        gameMapUI.showQuestions();

            let move=0;
            const timer=  setInterval(() => {
            gameMapUI.moveEnimies(move,0);
            gameMapUI.moveEnimies(move,1);
            gameMapUI.moveEnimies(move,2);
            gameMapUI.moveEnimies(move,3);
            gameMapUI.moveEnimies(move,4);
            move++;
                
            // console.log(`${gameMapUI.allien[0].getBoundingClientRect().y}`);
            // todo track the distance from the bottom of the screen for each allien and use that to determine when to stop

                if(gameMapUI.allien[0].getBoundingClientRect().y>=window.innerHeight-(gameMapUI.cannon.clientHeight+gameMapUI.allien[0].offsetWidth))//client y=spacecraft pix+cannonsize
                {
                    //todo reset game on hit with cannon
                    clearInterval(timer);
                }
            }, 100);

            document.addEventListener("keydown",(e)=>{
                if(e.keyCode==32)
                {
                 //   console.log(gameMapUI.checkBulletAmt());
                   if(gameMapUI.checkBulletAmt()<1)
                   {
                    const bulle= new bullet();
                    bulle.spawnBullet();
                    //todo spawn bullet at the location of the cannon
                   }
                     
                }
            });
        
        document.addEventListener("keydown",(e)=>{//move cannon
            //* Move the cannon to the left and right using arrows and a touch type interface for mobile
            // todo implement a way to detect touch on mobile to move the cannon left and right

                const cannonDistanceFromLeft=this.convertPX(gameMapUI.cannon.style.marginLeft);
                const cannonTravelDistance=gameMapUI.cannon.offsetWidth;
                const gameScreenSize=gameMapUI.gameContainer.offsetWidth;
            if(e.key=="ArrowRight")
            {
                if(cannonDistanceFromLeft<=gameScreenSize-cannonTravelDistance-15)
                {
                    GameInstance.cannonLocation+=15;
                    gameMapUI.moveCannon(GameInstance.cannonLocation);
                }
                console.log(GameInstance.cannonLocation);
            }
            if(e.key=="ArrowLeft")
            {
                if(this.convertPX(gameMapUI.cannon.style.marginLeft)>=0)
                {
                    GameInstance.cannonLocation-=15;
                    gameMapUI.moveCannon(GameInstance.cannonLocation);
                }
                console.log(GameInstance.cannonLocation);
            }
        });
        //pause game
        //read rules
        //exit
        
    },
    resizeComponents()
    {
        // !fetch the size of the screen and dynamicaly update the size of the image for the allien
        const containerWIdth=gameMapUI.gameContainer.clientWidth;
        const allienSize=containerWIdth/5-10;
        gameMapUI.allien.forEach((rr)=>{
            rr.style.width=`${allienSize}px`;
            rr.style.height=`${allienSize}px`;
        },);
        gameMapUI.cannon.style.width=`${allienSize*1.2}px`;
        gameMapUI.cannon.style.height=`${allienSize*1.2}px`;
    }
  
}

app.init();