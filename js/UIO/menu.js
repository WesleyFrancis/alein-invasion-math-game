const Menu={
    Easy:document.querySelector("#easy"),
    Hard:document.querySelector("#hard"),
    NameSlot:document.querySelector("section > h4"),

    setName(val)
    {
        this.NameSlot.innerHTML=val;
    }

}
//! SAVE PREFERENCES TO SAVE GAME AND ALSO SAVE THAT TO LOCAL STORAGE
export default Menu;