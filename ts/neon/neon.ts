import {Style, StyleBuilder} from "./components"

export class Neon{
    private readonly styleBuilder: StyleBuilder

    private style : Style
    private isThemeDark: boolean
    private debug: boolean = true

    constructor(styleBuilder: StyleBuilder, isThemeDark: boolean){
        this.styleBuilder = styleBuilder
        this.isThemeDark = isThemeDark
        this.style = this.styleBuilder.build(this.isThemeDark)
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

    public getIsThemeDark(): boolean{
        return this.isThemeDark
    }

    public switchTheme(): void{
        this.isThemeDark = !this.isThemeDark
        this.style = this.styleBuilder.build(this.isThemeDark)
    }

}


