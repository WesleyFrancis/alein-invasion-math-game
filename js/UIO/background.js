import GameInstance from "../BIO/gameInstance.js";
import gameUI from "./gameMap.js";
const background={

    background:document.querySelector("body"),
    mute:document.querySelector("#mute"),

   updateBackground(index)
   {
    this.background.style.backgroundPosition=`${index-1}px ${index+1}px`;
   },
   updateAudio(isplaying)
   {
       if(this.background.querySelector("audio")==null)
       {
            this.createAudio();
       }
        const audio=this.background.querySelector("audio");
        if(isplaying)
        {
            audio.load();
            audio.play();
            mute.setAttribute("src","../images/sound.png");
            GameInstance.SaveData.isAudioPlaying=true;
        }
        else
        {
            audio.pause();
            mute.setAttribute("src","../images/mute.png");
            GameInstance.SaveData.isAudioPlaying=false;
        }
    },
    createAudio()
    {
        if(this.background.querySelector("audio")==null)
        {//create background audio tag on page dynamically
            const aud=document.createElement("audio");
            const audSrc=document.createElement("source");
            audSrc.setAttribute("src","../audio/POL-net-bots-short.wav");
            audSrc.setAttribute("type","audio/wav");
            aud.appendChild(audSrc);
            this.background.appendChild(aud);
        }
   },
   toggleAudio()
   {
       if(GameInstance.SaveData.isAudioPlaying)//TODO change icon based on audio state
       {
           this.updateAudio(false);
           GameInstance.SaveData.isAudioPlaying=false;
       }
       else{
            this.updateAudio(true);
           GameInstance.SaveData.isAudioPlaying=true;
       }
   }
}
export default background;