import * as p5 from "p5"
import {PxSize} from "../layout"
import {HeartRating} from "./rating/heartRating"
import {StarRating} from "./rating/starRating"
import {ImageRating} from "./rating/ImageRating"
import {ArrowGauge} from "./gauge/arrowGauge"
import {StripedGauge} from "./gauge/stripedGauge"
import {StripedProgressBar} from "./progressbar/stripedProgressBar"
import {BarsSignal} from "./signal/barsSignal"

import { SharpRadar } from "./radar/sharpRadar"
import { RadarData } from "./radar/abstractRadar"
import { SmoothRadar } from "./radar/smoothRadar"

type ElementsSizes = {
    [elementName: string]: {
        s: PxSize, 
        m: PxSize, 
        l: PxSize
    }
}

const su = 10 /* Size Unit */

type Size = "s" | "m" | "l"

export interface ElementProps { // rename to FactoryProps to avoid confusion with VElement props
    id? : any,
    size? : Size,
}

export interface BarsSignalProps extends ElementProps {}
export interface HeartRatingProps extends ElementProps {}
export interface StarRatingProps extends ElementProps {}
export interface ImageRatingProps extends ElementProps {
        img? : p5.Image
}
export interface StripedGaugeProps extends ElementProps {}
export interface StripedProgressBarProps extends ElementProps {}
export interface RadarProps extends ElementProps {}

export class Elements{
    private static readonly pxSizes: ElementsSizes = { // make keys type (elementNames) ?
        wifiSignal: {
            s: new PxSize(3 * su), // change strokeWeight
            m: new PxSize(6 * su), 
            l: new PxSize(9 * su)
        },
        barsSignal: { // same size --> merge with wifiSignal ?
            s: new PxSize(3 * su), 
            m: new PxSize(6 * su), 
            l: new PxSize(9 * su)
        },
        rating: { // All ratings (Abstract rating)
            s: new PxSize(8 * su, 2 * su), // TO DO: fix aliasing problems
            m: new PxSize(12 * su, 3 * su), 
            l: new PxSize(16 * su, 4 * su)
        },
        arrowGauge: { // merge with gauge ?
            s: new PxSize(5 * su),
            m: new PxSize(10 * su), 
            l: new PxSize(15 * su) // Change radius (space wasted on bottom)
        },
        gauge: { 
            s: new PxSize(5 * su), 
            m: new PxSize(10 * su), 
            l: new PxSize(15 * su)
        },
        stripedGauge: { // Merge with gauge ?
            s: new PxSize(5 * su),
            m: new PxSize(10 * su), 
            l: new PxSize(15 * su)
        },
        progressBar: {
            s: new PxSize(10 * su, 2 * su),
            m: new PxSize(15 * su, 3 * su),
            l: new PxSize(20 * su, 4 * su)
        },
        stripedProgressBar: {
            s: new PxSize(15 * su, 5 * su), // Change font size and paddings 
            m: new PxSize(20 * su, 6 * su), 
            l: new PxSize(30 * su, 8 * su)
        },
        radar: {
            s: new PxSize(25 * su), // Change font size
            m: new PxSize(35 * su), 
            l: new PxSize(45 * su)
        },
    }

    public static createBarsSignal(rate: number, props: BarsSignalProps): BarsSignal{
        return new BarsSignal(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "barsSignal"),
            rate) 
    }

    public static createHeartRating (rate: number, props:HeartRatingProps): HeartRating{
        return new HeartRating(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "rating"),
            rate) 
    }

    public static createStarRating(rate : number, props : StarRatingProps): StarRating{
        return new StarRating(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "rating"),
            rate) 
    }

    public static createImageRating(rate : number, props : ImageRatingProps): ImageRating{
        const element =  new ImageRating(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "rating"),
            rate)        
        if (props.img){    
            element.withImage(props.img)
        }
        return element    
    }

    public static createStripedGauge(percent: number, props : StripedGaugeProps){
        return new StripedGauge(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "stripedGauge"),
            percent) 
    }

    public static createStripedProgressBar(percent: number, props:StripedProgressBarProps): StripedProgressBar{
        return new StripedProgressBar(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "stripedProgressBar"),
            percent) 
    }

    public static createSharpRadar(data: RadarData, props:RadarProps): SharpRadar{
        return new SharpRadar(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "radar"),
            data
        )
    }

    public static createSmoothRadar(data: RadarData, props:RadarProps): SmoothRadar{
        return new SmoothRadar(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "radar"),
            data
        )
    }

    public static getSize(size: Size, elementName: string): PxSize{
        return this.pxSizes[elementName][size]
    }
}
