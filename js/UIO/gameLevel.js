import Alien from "../BIO/alien.js";
import GameInstance from "../BIO/gameInstance.js";

const level={
    playingField:document.querySelector("#enime"),


    addAlien()//build alien and add to screen
    {
        const enime=new Alien(200,6,2);
        this.playingField.appendChild(enime.spawnAlien());
    },
    startGame()//create emimies
    {
        let fraction="";
        for(let i=0;i<GameInstance.maxEnime;i++)
        {
            fraction+="1fr ";
            this.addAlien();
        }
      //  console.log(fraction);
        
        this.playingField.style.gridTemplateColumns=fraction;
        
        this.moveEnimies();//make enimies move down
    },
    moveEnimies()
    {
      //  console.log(this.playingField.children[0]);
        
            let move=0;
            
          const timer=  setInterval(() => {
                move+=5;
               // console.log(this.playingField.children[0].style.marginTop=move);
                const d=this.playingField.children[2].style.marginTop=`${move}px`;
               // console.log(d);

                if(move==600)
                {
                    clearInterval(timer);
                }
            }, 100);
            
            
    }

}
export default level;