import { VElement } from "../core";
import { PxSize } from "../layout";
import {AnimationUtils} from "../utils"
import {style} from "../app"

export class LoadingBarWithWaves extends VElement{


    private value: number

    constructor(id: any, pxSize: PxSize, value: number){ // value -> intensity ?
        super(id, pxSize, false)
        this.value = value
        const duration = 1000 /*ms*/
        // AnimationUtils.animate(0, value, duration, (s:number) => this.value = s)
    }

    public render() : void {
        strokeJoin(ROUND)
        strokeWeight(2)
        fill(style.color.front)
        noStroke()
        const barHeight = this.getPxSize().getHeight()
        const barWidth = this.getPxSize().getWidth()
        const yFill = barHeight * (1 - this.value / 100) // y coordinate of "liquid" surface

        //Render "liquid"
        rect(0, yFill, barWidth, barHeight - yFill)

        //Render wave
        this.renderWave(yFill, barWidth, 0.9 * barWidth)

        // Render Bar/container
        noFill()
        stroke(style.text.color.primary)
        rect(0,0, this.getPxSize().getWidth(), this.getPxSize().getHeight())
    }
    /**
     * 
     * @param yFill y coordinate of "liquid" surface
     * @param barWidth With of bar/container
     * @param translationDistance in [0, barWidth[ horizontal distance traveled by wave 
     */
    private renderWave(yFill: number, barWidth: number, translationDistance: number): void{
        push()
        stroke(style.color.front)
        const radius = barWidth / (2 * sqrt(2))
        translate(0, yFill - radius)
        // rect(0, sqrt(2) * diameter / 4, 300,100)
        noFill()
        
        if (translationDistance < barWidth / 4){
            // Crop last arc
            translate(translationDistance, 0)
            this.renderArc(0, radius, 0, 0)
            this.renderArc(1, radius, 0, 0)
            this.renderArc(2, radius, asin(translationDistance / radius), 0)
            translate(- barWidth, 0)
            this.renderArc(2, radius, 0, - QUARTER_PI + asin(translationDistance / radius))
        } else if (translationDistance < barWidth / 2){
            // Crop second part of second arc
            translate(translationDistance, 0)
            this.renderArc(0, radius, 0, 0)
            this.renderArc(1, radius, 0, - asin((translationDistance - barWidth / 4) / radius))
            translate(- barWidth, 0)
            this.renderArc(2, radius, 0, 0)
            this.renderArc(1, radius, HALF_PI - asin((translationDistance - barWidth / 4) / radius), 0)
        } else if (translationDistance < 3 * barWidth / 4){
            // Crop first part of second arc
            translate(translationDistance, 0)
            this.renderArc(0, radius, 0, 0)
            this.renderArc(1, radius, 0, - QUARTER_PI - asin((translationDistance - barWidth / 2) / radius))
            translate(- barWidth, 0)
            this.renderArc(2, radius, 0, 0)
            this.renderArc(1, radius, QUARTER_PI - asin((translationDistance - barWidth / 2) / radius), 0)
        } else{
            // 3 * barWidth / 4 <= translationDistance < barWidth
            // Crop first arc
            translate(translationDistance, 0)
            this.renderArc(0, radius, asin((translationDistance - 3 * barWidth / 4) / radius), 0)
            translate(- barWidth, 0)
            this.renderArc(0, radius, 0, - QUARTER_PI + asin((translationDistance - 3 * barWidth / 4) / radius))
            this.renderArc(1, radius, 0, 0)
            this.renderArc(2, radius, 0, 0)
        }
        pop()


        
    }

    private renderArc(arcIndex:number, radius: number, start: number, end: number){
        switch(arcIndex){
            case 0:
                arc(
                    0,
                    0, 
                    radius * 2, 
                    radius * 2, 
                    QUARTER_PI + start, 
                    HALF_PI + end
                )
                break
            case 1:
                arc(
                    radius * sqrt(2), 
                    radius * sqrt(2), 
                    radius * 2, 
                    radius * 2, 
                    PI + QUARTER_PI + start, 
                    -QUARTER_PI + end
                )
                break
            case 2:
                arc(
                radius * sqrt(2) *  2, 
                0, 
                radius * 2, 
                radius * 2, 
                HALF_PI + start, 
                PI - QUARTER_PI + end
            )
        }
        
    }

}