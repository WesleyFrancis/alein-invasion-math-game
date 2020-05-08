const Menu={
    playBtn:document.querySelector("section > img"),
    NameSlot:document.querySelector("section > h4"),

    setName(val)
    {
        this.NameSlot.innerHTML=val;
    }

}

export default Menu;