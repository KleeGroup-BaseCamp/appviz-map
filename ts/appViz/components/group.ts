import * as p5 from "p5"
import {neon} from "../app"
import {Component, State, PushPop, ComponentProps, ColorUtils, Button, Header, VText, ProgressBar, PxSize} from "../../neon"
import {ItemTypeName, ItemTypeFrequencies} from "../types"
import {Icons} from "./icons"


export interface GroupProps extends ComponentProps{
    color?: p5.Color,
    maxValue?: number
}
export class Group extends Component {
    private readonly itemTypeFrequencies: ItemTypeFrequencies
    private readonly maxValue: number
    private readonly header: Header
    private readonly progressBars: ProgressBar[]
    private readonly color: p5.Color
    private readonly button : Button

    constructor(title: string, itemTypeFrequencies: ItemTypeFrequencies, props: GroupProps) {
        super(props, "Group", true)
        this.color = ColorUtils.clone(props.color ?? neon.getStyle().color.a)
        this.header = new Header(
            title, 
            {
                size: new PxSize(this.getWidth(), 50), 
                fontSize: neon.getStyle().text.size.m
            }
        )
        this.itemTypeFrequencies = itemTypeFrequencies
        this.maxValue = props.maxValue ?? 20

        this.progressBars = []
        Object.keys(this.itemTypeFrequencies).forEach(item => {
            this.progressBars.push(
                new ProgressBar(
                    (this.itemTypeFrequencies[item as ItemTypeName] ?? 0) * 100 / this.maxValue, 
                    {size:new PxSize(this.getWidth() - 90, 30)}
                )   
            )
        })
        this.button = new Button({size: new PxSize(50), color: neon.getStyle().color.undefined})
    }

    /**
     * @override
     */
    public render(state : State): void {
        //-- background
        this.renderBackground(state)

        //-- header
        this.header.render()
        noStroke()
        fill(this.color) 
        rect(0, 0, 4, 50)   

        //-- body
        this.renderItems()
        //--button
        if (state.isHovered(this)){
            this.renderButton()
        }
    }

    @PushPop
    private renderButton(): void{
        translate(this.getWidth()/2, this.getHeight()/2) 
        this.button.render()
    }
    
    private renderBackground(state : State): void {
        fill(state.isHovered(this) 
            ? neon.getStyle().color.front
            : neon.getStyle().color.middle)
        noStroke()
        rect(0, 0, this.getWidth(), this.getHeight())
    }
    
    /*
    *   Render item type:
    *       - Icon
    *       - Item frequency
    *       - Progress bar
    */
    private renderItems(): void {
        const top = textAscent() + 35
        let positions: number[] = []
        for (let i = 0; i < Object.keys(this.itemTypeFrequencies).length; i++) {
            positions.push(top + (this.getHeight() - top) / (Object.keys(this.itemTypeFrequencies).length + 1) * (i + 1))
        }
        Object.keys(this.itemTypeFrequencies).forEach((itemPrefix, index) => {
            push()
            translate(10, positions[index] - 20)
            push()
            textAlign(LEFT, TOP)
            new VText(Icons.getIcon(itemPrefix as ItemTypeName), {font: neon.getStyle().icon.font, fontSize: neon.getStyle().icon.size.xl}).render()
            pop()
            translate(50, 0)
            this.progressBars[index].render()
            pop()
        })
    }
}