//----------------import stuff--------------
import MainScrn from "./UIO/mainScreen.js";
import playerData from "./DAO/playerData.js"

    const startScrn=new MainScrn();
    const plyrDta=new playerData();
    function main()
    {
        
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
                alert("enter something"); // to be replaced with message class
            }
        });
    }



main();