import Alien from "../BIO/alien.js";
import GameInstance from "../BIO/gameInstance.js";

const level={
    gameContainer:document.querySelector(".container"),
    playingField:document.querySelector("#enime"),
    cannon:document.querySelector("#cannon"),
    allien:document.querySelectorAll(".allien"),

    startGame()//create emimies
    {

    },
    moveEnimies(dist,ship)
    {
        this.playingField.children[ship].style.marginTop=`${dist}px`;

    },
    moveCannon(num){

            this.cannon.style.marginLeft=`${num}px`;
        
    },
    showQuestions(){
        this.playingField.children[0].innerHTML=GameInstance.question(0);
        this.playingField.children[1].innerHTML=GameInstance.question(1);
        this.playingField.children[2].innerHTML=GameInstance.question(2);
        this.playingField.children[3].innerHTML=GameInstance.question(3);
        this.playingField.children[4].innerHTML=GameInstance.question(4);
        this.cannon.innerHTML=GameInstance.cannon();
    }

}
export default level;