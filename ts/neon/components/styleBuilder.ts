import * as p5 from "p5"
import {ComponentsSizes, Style} from "."
import {PxSize} from "../layout"

const su = 10 // Size Unit

interface SizesJson {
    [componentName: string]: {
        s: {width: number, height?: number},
        m: {width: number, height?: number},
        l: {width: number, height?: number}
    }
}

interface Theme{
    a: string,
    b: string,
    c: string, 
    d: string, 
    back: string, 
    middle: string,  
    front: string, 
    undefined: string,
    text:{
        primary: string,
        secondary: string
    }
}

const themeNames = ["dark", "light"] as const
export type ThemeName = typeof themeNames[number]
export const isThemeName = (name: string): name is ThemeName => 
    themeNames.includes(name as ThemeName)

export class StyleBuilder {
    private themeName : string = 'dark'
    private textFont?: p5.Font
    private iconFont? : p5.Font
    private pxSizes?: SizesJson
    private themes: {[themeName in ThemeName]?: Theme} = {}

    constructor() {
    }

    public withTheme(themeName :string){
        this.themeName = themeName
        return this
    }

    private notNull(font? : p5.Font):p5.Font {
        if(font){
            return font
        }
        throw 'value must not be null'
    } 

    public load(): StyleBuilder {
        this.loadFonts()
        this.loadThemes()
        this.pxSizes = loadJSON("ts/neon/data/sizes.json") as SizesJson
        return this
    }

    private loadFonts(): void {
        this.textFont = loadFont("fonts/Montserrat-Regular.ttf")
        this.iconFont = loadFont("fonts/material-design-outlined.ttf")
    }

    private loadThemes(): void{
        this.themes.dark = loadJSON("ts/neon/data/dark.json") as Theme
        this.themes.light = loadJSON("ts/neon/data/light.json") as Theme
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
        const theme = this.themes[this.themeName]
        if (!theme){
            throw `Theme ${themeName} is undefined`
        }
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
                    primary : color(theme.text.primary), /* white */ 
                    secondary : color(theme.text.secondary),  /* light grey */
                }    
            },
            color : {
                a : color(theme.a), /* blue */
                b : color(theme.b), /* green */
                c : color(theme.c), /* red */
                d : color(theme.d), /* grey */
        
                /* back to front colors */
                back : color(theme.back),  /* deep dark */
                middle : color(theme.middle),  /* dark */
                front : color(theme.front),  /* light dark */
        
                undefined : color(theme.undefined),  /* lemon*/
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

