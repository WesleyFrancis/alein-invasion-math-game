// param myParam----------------import stuff--------------
import StartScreenUI from "./UIO/startScreen.js";
import BackgroundUI from "./UIO/background.js";
import playerData from "./DAO/playerData.js";
import gameMapUI from "./UIO/gameMap.js";
import MenuUI from "./UIO/menu.js";
import GameInstance from "./BIO/gameInstance.js";

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
        this.resizeComponents();

       });
       BackgroundUI.mute.addEventListener("click",()=>{
            BackgroundUI.toggleAudio();
        });
        document.addEventListener("keydown",(e)=>{
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
            }
            if(e.key=="ArrowLeft")
            {
                if(this.convertPX(gameMapUI.cannon.style.marginLeft)>=0)
                {
                    GameInstance.cannonLocation-=15;
                    gameMapUI.moveCannon(GameInstance.cannonLocation);
                }
                
            }
        });
        
        window.addEventListener('resize',()=>{
            this.resizeComponents();
        });
    },
    getRandomInt(max) {
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
    gameMapr()
    {

            let move=0;
            const timer=  setInterval(() => {
                gameMapUI.moveEnimies(move,0);
                gameMapUI.moveEnimies(move,1);
                gameMapUI.moveEnimies(move,2);
                gameMapUI.moveEnimies(move,3);
                gameMapUI.moveEnimies(move,4);
                move++;
                if(move>=window.innerHeight-350)//client y=spacecraft pix+cannonsize
                {
                    clearInterval(timer);
                }
            }, 100);
            
        //pause game
        //move cannon
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