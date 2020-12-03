import {ColorUtils} from "../../utils"
import {style} from "../../app"
import {VElement, State} from "../../core"
import {Header} from "../../components"
import {PxSize} from "../../layout"

export class Card extends VElement {
    private readonly header: Header
 //   private readonly paper: Paper

    constructor(id: any, pxSize: PxSize, title: string) {
        super(id, pxSize, false)
        this.header = new Header(title, this.getWidth(), 100, style.text.size.xxl)
 //       this.paper = new Paper(this.getWidth(), this.getHeight(), 50) 
    }

    /**
     * @override
     */
    public render(state :State): void  {
        this.renderBackground()
   //     this.paper.render(0, 0)
        this.header.render()

    }

    private renderBackground(): void {
        noStroke()
        noFill()
        rect(0, 0, this.getWidth(), this.getHeight())
    }

    public needsClear():boolean {
        return false
    }
}

/*class Paper {
    private readonly canvas
    
    constructor(paperWidth : number, paperHeight : number, arg: number) {
        //https://www.openprocessing.org/sketch/442874
        this.canvas = createGraphics(paperWidth, paperHeight)
//        colorMode(HSB, 100, 100, 100);
        this.canvas.noStroke()
        const backColor = ColorUtils.clone(style.color.middle)
        for (var i = 0; i < paperWidth - 1; i += 2) {
            for (var j = 0; j < paperHeight - 1; j += 2) {
                backColor.setAlpha(random(arg))
                this.canvas.fill(backColor)
                this.canvas.ellipse(i, j, 2, 2)
            }
        }
    }
    
    public render(x:number, y:number) {
      image(this.canvas, x, y);
    }
 }*/