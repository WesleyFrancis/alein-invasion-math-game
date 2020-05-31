import gameUI from "../UIO/gameMap.js";
import gameIstance from "./gameInstance.js";
import GameInstance from "./gameInstance.js";
const Question ={
    questionNo:0,
    firstNum:0,
    secondNum:0,
    operation:0,
    ans:0,
    info : {
        cannon:0,
        allien:[]
    },
    CreateQuestion()// create the questions
    {
        this.info.allien.length=0;
        for(let i=0;i<5;i++)
        {
            let num1=this.getRandomInt(24)+1;
            let num2=this.getRandomInt(8)+1;
            let str=this.info.allien.push(`${num1} + ${num2}`);
            
            GameInstance.question.allien.push(str);
            // console.log(this.info.allien);
        }
        const cannonIndex = this.getRandomInt(4); //@ is an inde between 0-4, use that to target the information for a generated answer
        const questionInfo= this.info.allien[cannonIndex];
        const quesArr= questionInfo.split("+"); //! the operator have to be dynamis and based on he lefel the gane is;
        let numA = quesArr[0];
              numA = parseInt(numA);
        let numB = quesArr[1];
              numB = parseInt(numB);

        this.info.cannon= numA+numB; //! based on operator and have to be dynamic
        gameIstance.question.cannon=this.info.cannon;
    },
    CheckIfCorrect(ship)
    {
        let data = gameUI.playingField.children[ship].innerHTML;
        const numbers=data.split("+"); //! the operator have to be dynamis and based on he lefel the gane is;
        let partA=numbers[0];
            partA=parseInt(partA);
        let partB=numbers[1];
            partB=parseInt(partB);
        
        let BulletNum=gameUI.cannon.innerHTML;
            BulletNum=parseInt(BulletNum);

            partA=parseInt(partA);
            partB=parseInt(partB);

        if(partA+partB==BulletNum)
        {
            GameInstance.hitted();
            return true;
            //TODO correct ship was hit increment hit

        }
        else
        {
            GameInstance.missed();
            return false;
            //TODO Wrong ship was hit increment miss
        }
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

}
export default Question