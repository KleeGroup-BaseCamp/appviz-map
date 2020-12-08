import * as p5 from "p5"
import {ComponentsSizes, Style} from "."
import {PxSize} from "../layout"

const su = 10 // Size Unit

interface sizesJson {
    [componentName: string]: {
        s: {width: number, height?: number},
        m: {width: number, height?: number},
        l: {width: number, height?: number}
    }
}
export class StyleBuilder {
    private textFont?: p5.Font
    private iconFont? : p5.Font
    private pxSizes?: sizesJson

    constructor() {
    }

    private notNull( font? : p5.Font ):p5.Font {
        if(font){
            return font
        }
        throw 'value must not be null'
    } 
    public load(): StyleBuilder {
        this.loadFonts()
        this.pxSizes = loadJSON("/ts/neon/data/sizes.json") as sizesJson // Use relative path ?
        return this
    }

    private loadFonts(): void {
        this.textFont = loadFont("fonts/Montserrat-Regular.ttf")
        this.iconFont = loadFont("fonts/material-design-outlined.ttf")
    }

    private buildPxSize(size: {width: number, height?: number}): PxSize{
        return new PxSize(
            size.width* su, 
            (size.height ?? size.width) * su
        )
    }

    private buildPxSizes(): ComponentsSizes{
        const componentsSizes: ComponentsSizes = {}
        for (let componentName in this.pxSizes){
            const sizes = this.pxSizes[componentName]
            componentsSizes[componentName] = {
                s: this.buildPxSize(sizes.s),
                m: this.buildPxSize(sizes.m),
                l: this.buildPxSize(sizes.l),
            }
        }
        return componentsSizes
    }

    public build(): Style {
        /* DarkTheme */
        return  {
             icon: {
                font : this.notNull(this.iconFont), 
                size : {
                    s: 16,
                    m: 20,
                    l: 26,
                    xl: 32
                }
            },    
            text : {
                font : this.notNull(this.textFont),
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
            },
            pxSizes: this.buildPxSizes() 
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

