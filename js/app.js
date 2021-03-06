// param myParam----------------import stuff--------------
// todo: sounds for spaceship
// todo: make cannon move to location and shoot the answer on mobile.

import StartScreenUI from "./UIO/startScreen.js";
import BackgroundUI from "./UIO/background.js";
import playerData from "./DAO/playerData.js";
import gameMapUI from "./UIO/gameMap.js";
import MenuUI from "./UIO/menu.js";
import GameInstance from "./BIO/gameInstance.js";
import bullet from "./BIO/bullet.js";
import Question from "./BIO/question.js";
import end from "./UIO/endGame.js";
const app=
{
    startscrn: document.querySelector("#startBody"),
    mainscrns: document.querySelector("#MainMenu"),
    gameMap: document.querySelector("#gameMap"),
    endScreen:document.querySelector("#endScreen"),

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
        else if(this.endScreen!=null)
        {
            this.endScrn();
        }
        GameInstance.init();
        
        document.addEventListener("DOMContentLoaded",()=>{
            this.updateBackground();
            BackgroundUI.createAudio();
            BackgroundUI.updateAudio(GameInstance.SaveData.isAudioPlaying);//global state of the game information -> gameState.audio
           
       });
       BackgroundUI.mute.addEventListener("click",()=>{
            BackgroundUI.toggleAudio();
        });
    },
    updateBackground()//update background regardless of webpage
    {
        let index=1;
        setInterval((e) => {
            BackgroundUI.updateBackground(index);

            index++;
            if(index>=708)//708 width f ackground image to fake looping
            {
                index=0;
            }
        }, 100);
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
              //  plyrDta.savePlayer(StartScreenUI.userName.value);
              GameInstance.setPlayerName(StartScreenUI.userName.value);
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
        MenuUI.setName(`Hi ${GameInstance.getPLayerName()}`);
        GameInstance.init();

        MenuUI.Easy.addEventListener("click",()=>{
            GameInstance.setLevel("easy");
            window.location="../html/gameMap.html";
       });

       MenuUI.Hard.addEventListener("click",()=>{
            GameInstance.setLevel("hard");
            window.location="../html/gameMap.html";
       })
    },
    gameMapr()//game level script
    {
        GameInstance.init();//initialize infirmation for 1st time run.
        this.resizeComponents();//? DETECT SCREEN AND SCALE ELEMENTS TO FIT

        window.addEventListener('resize',()=>{
            this.resizeComponents();//!resize on page resize

        });

        gameMapUI.showQuestions();

        let move=0;
        const timer=  setInterval(() => {//! make it only end if any 1 of each ship dit cannon not just [0]|add visible timmer to screen and store time remaining to make continueing dynamic | made resumption
        move=GameInstance.SaveData.allienOffset;//distance from the top
        //Todo > make this more intuitave
        gameMapUI.moveEnimies(move);

        if(GameInstance.SaveData.difficultyLevel=="hard")
        {
            move+=3; 
        }
        else if(GameInstance.SaveData.difficultyLevel=="easy")
        {
            move+=1;
        }
        GameInstance.SaveData.allienOffset=move;

        if(gameMapUI.allien[0].getBoundingClientRect().y>=window.innerHeight-(gameMapUI.cannon.clientHeight+gameMapUI.allien[0].offsetWidth))//client y=spacecraft pix+cannonsize
        {
            //! Temp removed
            clearInterval(timer);
            GameInstance.init();
            window.location="endGame.html";
        }
        }, 100);

        document.addEventListener("keydown",(e)=>{
            if(e.keyCode==32)
            {
                if(gameMapUI.checkBulletAmt()<1)
                {
                const bulle= new bullet();
                bulle.spawnBullet();
                GameInstance.TrackBullet(); //*check bullet location peridocilly 
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
                    GameInstance.SaveData.cannonLocation+=15;
                    gameMapUI.moveCannon(GameInstance.SaveData.cannonLocation);
                }
            }
            if(e.key=="ArrowLeft")
            {
                if(this.convertPX(gameMapUI.cannon.style.marginLeft)>=0)
                {
                    GameInstance.SaveData.cannonLocation-=15;
                    gameMapUI.moveCannon(GameInstance.SaveData.cannonLocation);
                }
            }
        });
       
        gameMapUI.save.addEventListener("click",()=>{
            GameInstance.init();
            alert("game saved");
        });

        gameMapUI.shoot.addEventListener("click",()=>{
            if(gameMapUI.checkBulletAmt()<1)
            {
                const bulle= new bullet();
                bulle.spawnBullet();
                GameInstance.TrackBullet(); //*check bullet location peridocilly 
            }
        });
        gameMapUI.left.addEventListener("click",()=>{
            if(this.convertPX(gameMapUI.cannon.style.marginLeft)>=0)
                {
                    GameInstance.SaveData.cannonLocation-=15;
                    gameMapUI.moveCannon(GameInstance.SaveData.cannonLocation);
                }
        });

        gameMapUI.right.addEventListener("click",()=>{
        const cannonDistanceFromLeft=this.convertPX(gameMapUI.cannon.style.marginLeft);
        const cannonTravelDistance=gameMapUI.cannon.offsetWidth;
        const gameScreenSize=gameMapUI.gameContainer.offsetWidth;

            if(cannonDistanceFromLeft<=gameScreenSize-cannonTravelDistance-15)
                {
                    GameInstance.SaveData.cannonLocation+=15;
                    gameMapUI.moveCannon(GameInstance.SaveData.cannonLocation);
                }
        });

        //@ ***************** CLICK TO MOVE CANNON CAPABLITY *****************
            gameMapUI.playingField.addEventListener("click",(evt)=>{
            const xlocation =evt.clientX;
            let cannonLoc= GameInstance.SaveData.cannonLocation;//gameMapUI.cannon.style.marginLeft.slice(0,-2);
            cannonLoc=parseFloat(cannonLoc);
            let canonWID=gameMapUI.cannon.style.width.slice(0,-2);
            canonWID=parseFloat(canonWID);
            canonWID=canonWID/2;
            
            console.log(`xlocation:${xlocation} canonWID:${canonWID} cannonLoc:${cannonLoc}`)

            if(xlocation-canonWID>=cannonLoc)
            {
                let mover=setInterval(()=>{
                    cannonLoc+=10;
                    gameMapUI.moveCannon(cannonLoc)
                    if(xlocation-canonWID<=cannonLoc)
                    {
                        gameMapUI.moveCannon(xlocation-canonWID);//todo minus cannon width div 2
                        GameInstance.SaveData.cannonLocation=xlocation-canonWID;
                        gameMapUI.CreateBullet();
                        GameInstance.TrackBullet();
                        clearInterval(mover);
                    }
                },50);
            }
            else
            {
                let moveer=setInterval(()=>{
                    cannonLoc-=10;
                    gameMapUI.moveCannon(cannonLoc)
                    if(xlocation>=cannonLoc)
                    {
                        gameMapUI.moveCannon(xlocation-canonWID);//todo minus cannon width div 2
                       GameInstance.SaveData.cannonLocation=xlocation-canonWID;
                        gameMapUI.CreateBullet();
                        GameInstance.TrackBullet();
                        clearInterval(moveer);
                    }
                },50);
            } 
        });
    //@ ***************** CLICK TO MOVE CANNON CAPABLITY *****************
    },
    endScrn()
    {
        end.populate();
    },
    resizeComponents()
    {
        // !fetch the size of the screen and dynamicaly update the size of the image for the allien
        let containerWIdth=gameMapUI.gameContainer.clientWidth;
        let allienSize=containerWIdth/5;
        
        if(containerWIdth<=768)
        {console.log("768");
            let allienSize=containerWIdth/5-10;
        gameMapUI.allien.forEach((rr)=>{
            rr.style.width=`${allienSize}px`;
            rr.style.height=`${allienSize}px`;
        },);
        gameMapUI.cannon.style.width=`${allienSize*1.2}px`;
        gameMapUI.cannon.style.height=`${allienSize*1.2}px`;


        }
        else if(containerWIdth > 768 && containerWIdth<=1000)
        {
            console.log("1200");
            allienSize=containerWIdth/5-12;
            gameMapUI.allien.forEach((rr)=>{
                rr.style.width=`${allienSize}px`;
                rr.style.height=`${allienSize}px`;
            },);
            gameMapUI.cannon.style.width=`${allienSize*1.2}px`;
            gameMapUI.cannon.style.height=`${allienSize*1.2}px`;
        }
        else if(containerWIdth > 1000)
        {
            // todo: resize the spacecrat on desktop
            console.log("1080");
            allienSize=containerWIdth/5-120;
            gameMapUI.allien.forEach((rr)=>{
                rr.style.width=`${allienSize}px`;
                rr.style.height=`${allienSize}px`;
            },);
            gameMapUI.cannon.style.width=`${allienSize*1.2}px`;
            gameMapUI.cannon.style.height=`${allienSize*1.2}px`;

            // shoot.style.display="none";
            // left.style.display="none";
            // right.style.display="none";
        }
    }
}

app.init();