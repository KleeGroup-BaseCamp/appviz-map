import * as p5 from "p5"
import {ComponentsSizes, Style} from "./style"
import {PxSize} from "../layout"
import {Theme} from "./theme"
import { ColorStyle, IconStyle, TextStyle } from "./style"

const su = 20 // Size Unit

interface SizesJson {
    [componentName: string]: {
        s: {width: number, height?: number},
        m: {width: number, height?: number},
        l: {width: number, height?: number}
    }
}

export class StyleBuilder {
    private theme? : Theme
    private textFont?: p5.Font
    private iconFont? : p5.Font
    private pxSizes?: SizesJson

    constructor() {
    }

    public withTheme(theme : Theme){
        this.theme = theme
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
        this.pxSizes = loadJSON("ts/neon/data/sizes.json") as SizesJson
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
        if (! this.theme){
            throw 'a theme must be defined'
        }
        return  new Style(
            this.buildIconStyle(), 
            this.buildTextStyle(this.theme), 
            this.buildColorStyle(this.theme), 
            this.buildPxSizes()
        ) 
    } 

    private buildIconStyle(): IconStyle{
        return {
            font : this.notNull(this.iconFont), 
            size : {
                s: 16,
                m: 20,
                l: 26,
                xl: 32
            }
        }
    }

    private buildTextStyle(theme: Theme): TextStyle{
        return {
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
        }
    }

    private buildColorStyle(theme: Theme): ColorStyle{
        return {
            first : color(theme.a),
            second : color(theme.b), 
            a : color(theme.a), /* blue */
            b : color(theme.b), /* green */
            c : color(theme.c), /* red */
            d : color(theme.d), /* grey */
    
            /* back to front colors */
            back : color(theme.back),  /* deep dark */
            middle : color(theme.middle),  /* dark */
            front : color(theme.front),  /* light dark */
    
            undefined : color(theme.undefined),  /* lemon*/
        }
    }

}