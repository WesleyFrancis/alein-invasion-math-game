import gameUI from "../UIO/gameMap.js";
import GameInstance from "./gameInstance.js";
const Question ={
    ans:0,
    info : {
        cannon:0,
        allien:[]
    },
    CreateQuestion()// create the questions
    {
        this.info.allien.length=0;
        GameInstance.SaveData.currentQuestion.allien.length=0;
        for(let i=0;i<5;i++)
        {
            if(GameInstance.SaveData.currentLevel==0)//addition
            {
                let num1=this.getRandomInt(24)+1;
                let num2=this.getRandomInt(8)+1;
                
                let str=this.info.allien.push(`${num1} + ${num2}`);
                
                GameInstance.SaveData.currentQuestion.allien.push(str);
            }
            else if(GameInstance.SaveData.currentLevel==1)//substraction
            {
                let num1=this.getRandomInt(24)+1;
                let num2=this.getRandomInt(8)+1;
                while(num1<num2)
                {
                    num1=this.getRandomInt(24)+1;
                }
                let str=this.info.allien.push(`${num1} - ${num2}`);
                
                GameInstance.SaveData.currentQuestion.allien.push(str);
            }
        }
        const cannonIndex = this.getRandomInt(4); //@ is an inde between 0-4, use that to target the information for a generated answer
        const questionInfo= this.info.allien[cannonIndex];
        if(GameInstance.SaveData.currentLevel==0)
        {
            const quesArr= questionInfo.split("+"); 
            let numA = quesArr[0];
                numA = parseInt(numA);
            let numB = quesArr[1];
                numB = parseInt(numB);
            this.info.cannon= numA+numB; 
        }
        else if(GameInstance.SaveData.currentLevel==1)
        {
            const quesArr= questionInfo.split("-"); 
            let numA = quesArr[0];
                numA = parseInt(numA);
            let numB = quesArr[1];
                numB = parseInt(numB);
            this.info.cannon= numA-numB; 
        }
        GameInstance.SaveData.currentQuestion.cannon=this.info.cannon;
    },
    CheckIfCorrect(ship)//! Fix ittttttttttt
    {   
        let numbers="";
        let data = gameUI.playingField.children[ship].innerHTML;
        if(GameInstance.SaveData.currentLevel==0)
        {
             numbers=data.split("+"); 
        }
        else if(GameInstance.SaveData.currentLevel==1)
        {
             numbers=data.split("-"); 
        }
         //! the operator have to be dynamis and based on he lefel the gane is;
        let partA=numbers[0];
            partA=parseInt(partA);
        let partB=numbers[1];
            partB=parseInt(partB);
        
        let BulletNum=gameUI.cannon.innerHTML;
            BulletNum=parseInt(BulletNum);

       // console.log(`yty:${partA} yty:${partB} yuyu:${BulletNum}`);        
            
        if(GameInstance.SaveData.currentLevel==0)
        {
            console.log(`pa: ${partA}  pb${partB}`);
            if(partA+partB==BulletNum)
            {
                GameInstance.hitted();
           //     console.log("hitted");
                return true;
            }
            else
            {
                GameInstance.missed();
            //    console.log("missed");
                return false;
            }
        }
        else if(GameInstance.SaveData.currentLevel==1)
        {
            if(partA-partB==BulletNum)
            {
                GameInstance.hitted();
            //    console.log("hitted");
                return true;
            }
            else
            {
                GameInstance.missed();
            //    console.log("missed");
                return false;
            }
        }
    },
    getRandomInt(max) 
    {
        return Math.floor(Math.random() * Math.floor(max));
    }

}
export default Question