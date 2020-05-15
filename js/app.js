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
     
       });
       BackgroundUI.mute.addEventListener("click",()=>{
            BackgroundUI.toggleAudio();
        });
        document.addEventListener("keydown",(e)=>{
            if(e.key=="ArrowRight")
            {
                GameInstance.cannonLocation+=20;
                gameMapUI.moveCannon(GameInstance.cannonLocation);
            }
            if(e.key=="ArrowLeft")
            {
                GameInstance.cannonLocation-=20;
                gameMapUI.moveCannon(GameInstance.cannonLocation);
            }
        });
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
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
        
    }
  
}

app.init();