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
            audio.loop=true;
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
   },
   playShoot(){

    if(document.querySelector("#shootSound")==null)
    {
        const aud=document.createElement("audio");
        aud.setAttribute("id","shootSound");
        const audSrc=document.createElement("source");
        audSrc.setAttribute("src","../audio/Future Weapons 2.mp3");
        audSrc.setAttribute("type","audio/mp3");
        
        aud.appendChild(audSrc);
        this.background.appendChild(aud);
        if(GameInstance.SaveData.isAudioPlaying==true)
        {
            document.querySelector("#shootSound").play();
        }
    }
    else{

        if(GameInstance.SaveData.isAudioPlaying==true)
        {
            document.querySelector("#shootSound").play();
        }
    }
   },
   playExplosion()
   {
    if(document.querySelector("#expSound")==null)
    {
        const aud=document.createElement("audio");
        aud.setAttribute("id","expSound");
        const audSrc=document.createElement("source");
        audSrc.setAttribute("src","../audio/Grenade explosion.mp3");
        audSrc.setAttribute("type","audio/mp3");
        
        aud.appendChild(audSrc);
        this.background.appendChild(aud);
        if(GameInstance.SaveData.isAudioPlaying==true)
        {
            document.querySelector("#expSound").play();
        }
    }
    else{

        if(GameInstance.SaveData.isAudioPlaying==true)
        {
            document.querySelector("#expSound").play();
        }
    }
    

   },
   spawnExplode(location)
    {
        var image = new Image();
        image.src = "../images/explosion.gif";

        const explodeer = document.createElement("img");
        explodeer.setAttribute("id","exploder");
        explodeer.setAttribute("src",image.src);
        // explodeer.style.display="absolute";
        // explodeer.style.backgroundImage="url(../images/explosion.gif)";
        explodeer.style.marginLeft = `${location.x}px`;
        explodeer.style.marginTop = `${-80}px`;
        explodeer.style.width = `${80}px`;//todo use a % of allien with for explosion for dynamic
        explodeer.style.height = `${80}px`;//todo use a % of allien with for explosion for dynamic
        explodeer.style.zIndex = 300;
        document.querySelector("#gameMap").appendChild(explodeer);
        // console.log(location);
        setTimeout(()=>{
            explodeer.remove();
        },4920)
    }
}
export default background;