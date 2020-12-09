import {Style} from "./components"

export class Neon{
    private readonly style : Style
    private isThemeDark: boolean
    private debug: boolean = true

    constructor(style: Style, isThemeDark: boolean){
        this.style = style
        this.isThemeDark = isThemeDark
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

    public toggleTheme(): void{
        this.isThemeDark = !this.isThemeDark
    }

}


