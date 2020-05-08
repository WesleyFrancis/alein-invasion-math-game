//----------------import stuff--------------
import StartScreen from "./UIO/startScreen.js";
import Background from "./UIO/background.js";
import playerData from "./DAO/playerData.js";
import gameLevel from "./UIO/gameLevel.js";
import Menu from "./UIO/menu.js";


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
            this.mainManu();
        }
        else if(this.gameMap!=null)
        {
            this.gameMap();
        }
        //update background regardless of webpage
        const Galexyf = new Background();
        Galexyf.updateBackground();
    },

    startScreen()
    {
        const startScrn=new StartScreen();
        const plyrDta=new playerData();
        
            startScrn.nextButton.addEventListener("click",()=>{
            //load next page
            //save player info to player class and session
            if(startScrn.userName.value!='')
            {
                plyrDta.savePlayer(startScrn.userName.value);
                window.location ="html/menu.html";
            }
            else
            {
                alert("enter something"); // to be replaced with message class and dymamic messages
            }
        });

    },
    mainManu()
    {
        
        const Galexyf = new Background();
        Menu.setName(`Hi ${localStorage.getItem("playerName")}`);
        Galexyf.updateBackground();
        console.log(Menu.playBtn);
        Menu.playBtn.addEventListener("click",()=>{
        window.location="../html/gameMap.html";
       });

    },
    gameMap()
    {
        gameLevel.startGame();
        //pause game
        //move cannon
        //read rules
        //exit
        
    }

    
}

app.init();