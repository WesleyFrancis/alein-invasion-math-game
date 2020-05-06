class MainScreen{

    userName=document.querySelector("#playerName");
    nextButton=document.querySelector("#submit input")
    background=document.querySelector("body");


    updateBackground()
    {
        let index=1;
        setInterval((e) => {
            this.background.style.backgroundPosition=`${index}px ${0}px`;
            console.log(index);
            index++;
            if(index>=1920)
            {
                index=0;
            }
        }, 10);
    }
}
export default MainScreen;