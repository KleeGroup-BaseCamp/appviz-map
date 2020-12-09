import {Style, StyleBuilder, ThemeName} from "./components"

export class Neon{
    private style : Style
    private debug: boolean = true

    constructor(){
        this.style = new StyleBuilder().build()
    }

    public load(){
      //  this.style.load()
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

    public setTheme(themeName: ThemeName): void{
        this.style = new StyleBuilder()
            .withTheme(themeName)
            .build()
    }

}


