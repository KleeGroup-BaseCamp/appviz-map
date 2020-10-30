import {} from "p5/global"
import {Style} from "./style"

export class StyleBuilder {
    constructor() {
    }

    public build(): Style {
        const textFont = loadFont("fonts/Montserrat-Regular.ttf")
        const iconFont = loadFont("fonts/material-design-outlined.ttf")
        
        /* DarkTheme */
        return  {
             icon: {
                font : iconFont, 
                size : {
                    s: 16,
                    m: 20,
                    l: 26,
                    xl: 32
                }
            },    
            text : {
                font : textFont,
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
                color: {
                    /* text */
                    primary : color("#FFFFF"), /* white */ 
                    secondary : color("#9EA3B4"),  /* light grey */
                }    
            },
            color : {
                a : color("#2196F3"), /* blue */
                b : color( "#4CAF50"), /* green */
                c : color("#F44336"), /* red */
                d : color("#7881A9"), /* grey */
        
                /* back to front colors */
                back : color("#2a2c3b"),  /* deep dark */
                middle : color("#3A3E52"),  /* dark */
                front : color("#505464"),  /* light dark */
        
                undefined : color("#fff700"),  /* lemon*/
            }
       }
    } 
}
//        /* LightTheme */
//        /* back to front colors */
//        this.color.back   = color("#F6F6F4")  /*  light++ */
//        this.color.middle  = color("#EFEFEF")  /* light   */
//        this.color.front   = color("#DDDDDD")  /* light-- */
//        /* text */
//        this.text.color.primary   = color("#000000") /* black */
//        this.text.color.secondary  = color("#615c4b")
//        this.color.undefined  = color("0008ff")

