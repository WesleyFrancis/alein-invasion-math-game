import gameUI from "../UIO/gameMap.js";
import question from "./question.js";
const GameInstance ={
    //!all the information a game would need to have
    isAudioPlaying:false,
    cannonLocation:0,
    bulletLocation:0,
    allienOffset:0,
    hit:0,
    miss:0,
    question:{
        cannon:0,
        allien:[]
    },//* question is an object that holds informatio pertainig to the whole game question

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
    saveGame()
    {
        //TODO :tell game data to save game state
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
                
                if(this.CheckIfColliding())
                {
                    clearInterval(checker);
                    gameUI.deleteBullet();
                    //TODO in here is where everything pertaining to when the bullet collide happens
                    //TODO increment hit/miss restart game etc.
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
        allienWidth = allienWidth.slice(0,2);// remove the px in the width
        allienWidth= parseFloat(allienWidth);
        let start = ScreenWidth -(allienWidth*5);
        start=start/2;//Distance from left where allien start on screen
        start=parseFloat(start);
        let Ship=-1;
        let BulletWidth= gameUI.getBulletSize();

       let bulletLocation = this.bulletLocation+BulletWidth;//

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
       // console.log(gameUI.playingField.children);
        const shipwidth = gameUI.playingField.children[Ship].offsetWidth;
       const shipOffsetTop= gameUI.playingField.children[Ship].offsetTop;

        if(gameUI.getBulletLocation()<shipwidth+shipOffsetTop)
        {
            
            if(question.CheckIfCorrect(Ship))
            {
                console.log("correct");
                this.allienOffset=0;
               
                gameUI.showQuestions();
                //TODO reset spaceships to the top and create new question
            }
            else{
                console.log("Wrong");
                //TODO do stuff here fr correct
                
                gameUI.showQuestions();
            }
            return true;
        }
      //  
    },
    hitted()
    {
        this.hit+=1;
        gameUI.updateHit();
    },
    missed()
    {
        this.miss+=1;
        gameUI.updateMiss();
    }
}
export default GameInstance;