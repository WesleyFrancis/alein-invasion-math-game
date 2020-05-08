import Alien from "../BIO/alien.js";
import GameInstance from "../BIO/gameInstance.js";

const level={
    playingField:document.querySelector("#enime"),


    addAlien(num)//build alien and add to screen
    {
        const enime=new Alien(200,num,2);
        this.playingField.appendChild(enime.spawnAlien());
    },
    startGame()//create emimies
    {
        let fraction="";
        for(let i=0;i<GameInstance.maxEnime;i++)
        {
            fraction+="1fr ";
            this.addAlien(getRandomInt(10));
        }
      //  console.log(fraction);
        
        this.playingField.style.gridTemplateColumns=fraction;
        
        this.moveEnimies();//make enimies move down
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
    },
    moveEnimies()
    {
      //  console.log(this.playingField.children[0]);
      console.log(window.innerHeight);
            let move=0;
            for(let i=0;i<this.playingField.children.length;i++)
            {
                const timer=  setInterval(() => {
                    move+=.3;
                    const d=this.playingField.children[i].style.marginTop=`${move}px`;
                    
    
                    if(move>=window.innerHeight-320)//client y=spacecraft pix+cannonsize
                    {
                        clearInterval(timer);
                    }
                }, 100);
            }
    }

}
export default level;