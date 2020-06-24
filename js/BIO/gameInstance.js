import gameUI from "../UIO/gameMap.js";
import question from "./question.js";
import background from "../UIO/background.js";
const GameInstance ={
    //!all the information a game would need to have
    SaveData:{
        playerName:0,
        allienDist:[],//@ Distance from the top for each allien
        cannonLocation:0,
        difficultyLevel:0,
        currentLevel:0,
        allienOffset:0,
        currentQuestion:{
            allien:[],
            cannon:0,
            allienRanDist:[],
        },
        isAudioPlaying:false,
        timeRemaining:0,
        bulletLocation:0,
        hit:0,
        miss:0,
        hit2:0,
        miss2:0
    },
    init()
    {
        const gameMap= document.querySelector("#gameMap");
        if(gameMap!=null)
        {
            this.SaveData.timeRemaining=gameUI.timmer.innerHTML;
            this.cannonLocation = gameUI.cannon.getBoundingClientRect().left;
        }
        this.SaveData.playerName=this.getSaved().playerName;
        this.SaveData.difficultyLevel=this.getLevel();
        this.SaveData.isAudioPlaying=this.getSaved().isAudioPlaying;
        if(this.getSaved().isAudioPlaying)
        {
            background.toggleAudio(true);
        }
        if(this.SaveData.currentQuestion.allienRanDist.length>0)
        {
            localStorage.setItem("saveData",JSON.stringify(this.SaveData));
        }
        else{
            this.setOffset();
        }
        if(this.SaveData.currentLevel==0)
        {
            this.StartLevel1(90000);
        }
       
    },
    StartLevel1(timeremaining)
    {
        let timemere=timeremaining;
        const timmer=setTimeout(()=>{
            //Move on to next level
            this.SaveData.currentLevel=1;//minus
            gameUI.showQuestions();
            gameUI.resetCounter();
           this.startLevel2(60000);
        },timeremaining);

        const updater=setInterval(()=>{
            timemere-=1000;
            gameUI.updateTimmer(timemere/1000);
            
            if(timemere<=1000){
                if(this.SaveData.currentLevel==0)
                {
                    timemere=9000;
                }
                clearInterval(updater);
            }
        },1000);
    },
    startLevel2(timeremaining)
    {
        let timemere=timeremaining;
        const timmer=setTimeout(()=>{
            this.SaveData.currentLevel=3;
            this.init();
            window.location="endGame.html";
        },timeremaining);

        const updater=setInterval(()=>{
            timemere-=1000;
            gameUI.updateTimmer(timemere/1000);
            
            if(timemere<=1000)
            {
                clearInterval(updater);
            }
        },1000);
    },
    startGame()
    {
        //TODO : reset elements and fetch a new question
    },
    pauseGmae()
    {
        //TODO : pause all elements where they are in time
    },
    resumeGame()
    {
        //TODO :restart game using the saved state from the pause to continue from where they left off
    },
    endGame()
    {
        //TODO :do what game end should do show score etc
    },
    QuestionGame(index)
    {   
        return this.question.sel;
    },
    cannon()
    {
        return 7;
    },
    TrackBullet()
    {
        if(gameUI.checkBulletAmt()>0)
        {
            const checker = setInterval(()=>{
                
                if(this.CheckIfColliding())//@ increment hit/miss restart game etc.
                {
                    clearInterval(checker);
                    gameUI.deleteBullet();
                   //? background.playhut(); would be used to play audio

                    
                }
            },100);
        }
    },
    CheckIfColliding()//@ check to see if the bullet is colliding with any craft
    {
        // Check if bullet is collising with an allin ship by
        //searching for which shiis inline with the bullet then check to see when they collide
        //Get 
        const ScreenWidth = window.outerWidth;
        let allienWidth= gameUI.allien[0].style.width;
        allienWidth = allienWidth.slice(0,-2);// remove the px in the width
        allienWidth= parseFloat(allienWidth);
        let start = ScreenWidth -(allienWidth*5);
        start=start/2;//Distance from left where allien start on screen
        start=parseFloat(start);
        let Ship=-1;
        let BulletWidth= gameUI.getBulletSize();

       let bulletLocation = parseInt(gameUI.getBulletMargin())+BulletWidth ; //this.SaveData.cannonLocation+BulletWidth;//

       // console.log(`bulletLocation:${bulletLocation} BulletWidth:${BulletWidth}`);
        if(bulletLocation<(start+allienWidth))
        {
            Ship=0;
        }
        else if(bulletLocation>=start+allienWidth && bulletLocation<start+(allienWidth*2))
        {
            Ship=1;
        }
        else if(bulletLocation>=start+(allienWidth*2) && bulletLocation<start+(allienWidth*3))
        {
            Ship=2;
        }
        else if(bulletLocation>=start+(allienWidth*3) && bulletLocation<start+(allienWidth*4))
        {
            Ship=3;
        }
        else if(bulletLocation>=start+(allienWidth*4))
        {
            Ship=4;
        }
        //now we know the ship we can check it's collision with the bullet
        //console.log(gameUI.playingField.children);
        const shipwidth = gameUI.playingField.children[Ship].offsetWidth;
        const shipOffsetTop= gameUI.playingField.children[Ship].offsetTop;

        if(gameUI.getBulletLocation()<shipwidth+shipOffsetTop)
        {
          //  console.log(`OffsetTop:${gameUI.getBulletLocation()} Ship:${Ship}`);
            background.playExplosion();
            if(question.CheckIfCorrect(Ship))
            {
                //@ reset spaceships to the top and create new question
               // console.log("correct");
                this.SaveData.allienOffset=0; 
                gameUI.showQuestions();
                
            }
            else
            {
                //@ do stuff here fr correct
              //  console.log("Wrong");
                gameUI.showQuestions();
            }
            return true;
        } 
        else
        {
         return false;
        }
    },
    hitted()
    {
        if(this.SaveData.currentLevel==0)
        {
            this.SaveData.hit+=1;
            gameUI.updateHit();
        }
        else
        {
            this.SaveData.hit2+=1;
            gameUI.updateHit();
        }
        
        
    },
    missed()
    {
        if(this.SaveData.currentLevel==0)
        {
            this.SaveData.miss+=1;
            gameUI.updateMiss();
        }
        else
        {
            this.SaveData.miss2+=1;
            gameUI.updateMiss();
        }
        
    },
    setLevel(level)
    {
        this.SaveData.difficultyLevel=level;
        localStorage.setItem("saveData",JSON.stringify(this.SaveData));
    },
    getLevel()
    {
        return this.getSaved().difficultyLevel;
    },
    setPlayerName(name)
    {
        this.SaveData.playerName=name;
        localStorage.setItem("saveData",JSON.stringify(this.SaveData));
    },
    getPLayerName()
    {
        return this.getSaved().playerName
    },
    getSaved(){
        const datas=localStorage.getItem("saveData")//
        const fixed=JSON.parse(datas);
        return fixed;//! returns the object that was saved
    },
    setOffset()
    {
        this.SaveData.currentQuestion.allienRanDist.length=0;//empty the array
        for(let i=0;i<5;i++)
        {
            let Num = Math.floor(Math.random() * Math.floor(50));
            this.SaveData.currentQuestion.allienRanDist.push(Num);
        }
    },
    saveName()
    {
        localStorage.setItem("saveData",JSON.stringify(this.SaveData));
    }
}
export default GameInstance;