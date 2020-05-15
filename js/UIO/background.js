import GameInstance from "../BIO/gameInstance.js";
const background={

    background:document.querySelector("body"),
    mute:document.querySelector("#mute"),

   updateBackground(index)
   {
    this.background.style.backgroundPosition=`${index-1}px ${index+1}px`;
   },
   updateAudio(isplaying)
   {
    const audio=this.background.querySelector("audio");
       if(isplaying)
        {
            audio.load();
            audio.play();
        }
        else{

            audio.pause();
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
   upadteAudio(isplaying)
   {
        if(isplaying)
        {
            this.mute.load();
            this.mute.play();
        }
        else
        {
            this.mute.pause();
        }

   },
   toggleAudio()
   {
       if(GameInstance.isplaying)
       {
           this.updateAudio(false);
           GameInstance.isplaying=false;
       }
       else{
            this.updateAudio(true);
           GameInstance.isplaying=true;
       }
   }
}
export default background;