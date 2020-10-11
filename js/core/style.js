class Style {
    theme = {
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

        /* text */
        primary   : null,  /* white */ 
        secondary : null,  /* light grey */

        undefined :  null  /* lemnon*/
    }

    #icons = {
        dt: "\uf15b",
        tk: "\uf085"
    }

    constructor() {
    }

    load() {
        this.text.font = loadFont("fonts/Roboto-Regular.ttf")
        this.icon.font = loadFont("fonts/fa.otf")

        this.theme.a = color("#2196F3") /* blue */
        this.theme.b  = color( "#4CAF50") /* green */
        this.theme.c  = color("#F44336") /* red */
        this.theme.d  = color("#7881A9") /* grey */

        /* back to front colors */
        this.theme.back   = color("#2F3243")  /* deep dark */
        this.theme.middle  = color("#3A3E52")  /* dark */
        this.theme.front   = color("#505464")  /* light dark */

        /* text */
        this.theme.primary   = color("#FFFFF") /* white */ 
        this.theme.secondary  = color("#9EA3B4")  /* light grey */

        this.theme.undefined  = color("#fff700")  /* lemnon*/
        this.text.color  =  this.theme.primary
    }

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
        color : undefined
    }

    getIcon(itemPrefix) {
        return this.#icons[itemPrefix]
    }


    getPrimaryBorderColor(type, zone = null) {
        switch (type) {
            case "groupTitle":
            case "elementTypeTitle":
            case "zoneTitle":
                return this.theme.primary
            case "zone":
                switch (zone) {
                    case "pilotage":
                        return this.theme.b
                    case "operationnel":
                        return this.theme.a
                    case "referentiel":
                        return this.theme.c
                    default:
                        return this.theme.no-color
                    }
            case "itemType":
                return color([1, 255, 255])
            case "item":
                return color([1, 255, 255])
            default:
                return this.theme.undefined
        }
    }
}
