class Style {
    icon = {
        font : undefined, 
        size : {
            s: 16
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

        /* back to front colors */
        back   : null,  /* deep dark */
        middle : null,  /* dark */
        front  : null,  /* light dark */

        undefined :  null  /* lemnon*/
    }

    #icons = {
        dt: "\uf15b",
        tk: "\uf085"
    }

    constructor() {
    }

    load() {
        this.text.font = loadFont("fonts/Montserrat-Regular.ttf")
        this.icon.font = loadFont("fonts/fa.otf")

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

    getIcon(itemPrefix) {
        return this.#icons[itemPrefix]
    }
}
