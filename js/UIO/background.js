class Background{

   background=document.querySelector("body");

    updateBackground()
    {

        let index=1;
        setInterval((e) => {
            this.background.style.backgroundPosition=`${index-.2}px ${index+1}px`;

            index++;
            if(index>=1920)
            {
                index=0;
            }
        }, 100);
    }
}
export default Background;