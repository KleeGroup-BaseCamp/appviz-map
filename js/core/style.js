class Style {
    icon = {
        font : undefined, 
        size : {
            s: 16,
            m: 20,
            l: 26,
            xl: 32
        }    
    }    

    text = {
        font : undefined,
        size : {
            xxs: 12,
            xs: 14,
            s: 16,
            m: 20,
            l: 26,
            xl: 32,
            xxl: 42,
            default: 60
        }, 
        color : {
            primary   : null,  /* white */ 
            secondary : null,  /* light grey */
        }
    }

    color = {
        /* inspiration : www.behance.net/gallery/36390371/Virtus-Dashboard-Free-PSD-Template */

        /* colors */
        a : null, //color("#2196F3"), /* blue */
        b : null, /* green */
        c : null, /* red */
        d : null, /* grey */

        /* layer > back to front colors */
        back   : null,  /* deep dark */
        middle : null,  /* dark */
        front  : null,  /* light dark */

        undefined :  null  /* lemnon*/
    }

    #icons = {
        data: "\ue0ee", // \uf15b
        task: "\ue566",
    }

    constructor() {
    }

    load() {
        this.text.font = loadFont("fonts/Montserrat-Regular.ttf")
        this.icon.font = loadFont("fonts/material-design-outlined.ttf")
        if (random(0,10) > 5){
            this.#loadDarkTheme()
        }else {
            this.#loadLightTheme()
        }
    }    

    #loadDarkTheme() {
        this.color.a = color("#2196F3") /* blue */
        this.color.b  = color( "#4CAF50") /* green */
        this.color.c  = color("#F44336") /* red */
        this.color.d  = color("#7881A9") /* grey */

        /* back to front colors */
        this.color.back   = color("#2F3243")  /* deep dark */
        this.color.middle  = color("#3A3E52")  /* dark */
        this.color.front   = color("#505464")  /* light dark */

        /* text */
        this.text.color.primary   = color("#FFFFF") /* white */ 
        this.text.color.secondary  = color("#9EA3B4")  /* light grey */

        this.color.undefined  = color("#fff700")  /* lemon*/
    }

    #loadLightTheme() {
        this.color.a = color("#2196F3") /* blue */
        this.color.b  = color( "#4CAF50") /* green */
        this.color.c  = color("#F44336") /* red */
        this.color.d  = color("#7881A9") /* grey */

        /* back to front colors */
        this.color.back   = color("#F6F6F4")  /*  light++ */
        this.color.middle  = color("#EFEFEF")  /* light   */
        this.color.front   = color("#DDDDDD")  /* light-- */

        /* text */
        this.text.color.primary   = color("#000000") /* black */
        this.text.color.secondary  = color("#615c4b")

        this.color.undefined  = color("0008ff")
    }

    getIcon(itemPrefix) {
        return this.#icons[itemPrefix]
    }
}
