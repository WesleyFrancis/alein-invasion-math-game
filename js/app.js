//----------------import stuff--------------
import StartScreen from "./UIO/startScreen.js";
import playerData from "./DAO/playerData.js"

    

const app=
{
    startscrn: document.querySelector("#startBody"),
    mainscrns: document.querySelector("#MainMenu"),

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
    },

    startScreen()
    {
        const startScrn=new StartScreen();
        const plyrDta=new playerData();
       // const mainScreen= new MainMenu();
        
        startScrn.updateBackground();

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
        document.addEventListener("DOMContentLoaded",()=>{
            
            console.log( `Hello  ${localStorage.getItem("playerName")}`);
        });
    }
    
}

app.init();