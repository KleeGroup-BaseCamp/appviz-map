import {Style, StyleBuilder, ThemeName} from "./components"

export class Neon{
    private readonly styleBuilder: StyleBuilder

    private style : Style
    private debug: boolean = true

    constructor(styleBuilder: StyleBuilder){
        this.styleBuilder = styleBuilder
        this.style = this.styleBuilder.build('dark')
    }

    public getStyle(): Style{
        return this.style
    }
    
    public getDebug(): boolean{
        return this.debug
    }

    public setDebug(value: boolean): void{
        this.debug = value
    }

    public switchTheme(themeName: ThemeName): void{
        this.style = this.styleBuilder.build(themeName)
    }

}


