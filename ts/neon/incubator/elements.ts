import * as p5 from "p5"
import {PxSize} from "../layout"
import {HeartRating} from "./rating/heartRating"
import {StarRating} from "./rating/starRating"
import {ImageRating} from "./rating/ImageRating"
import {ArrowGauge} from "./gauge/arrowGauge"
import {Gauge} from "./gauge/gauge"
import {StripedGauge} from "./gauge/stripedGauge"
import {ProgressBar} from "./progressbar/progressBar"
import {StripedProgressBar} from "./progressbar/stripedProgressBar"
import {WifiSignal} from "./signal/wifiSignal"
import {BarsSignal} from "./signal/barsSignal"


import { Gauge2 } from "./gauge/gauge2"
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
export interface FactoryGaugeProps extends ElementProps { // factoory props are different than gauge props
    firstColor?: p5.Color,
    secondColor?: p5.Color
}

export interface WifiSignalProps extends ElementProps {}

export interface BarsSignalProps extends ElementProps {}
export interface HeartRatingProps extends ElementProps {}
export interface StarRatingProps extends ElementProps {}
export interface ImageRatingProps extends ElementProps {
        img? : p5.Image
}
export interface ArrowGaugeProps extends ElementProps {}
export interface GaugeProps extends ElementProps {
    firstColor?: p5.Color,
    secondColor?: p5.Color
}


export interface StripedGaugeProps extends ElementProps {}
export interface ProgressBarProps extends ElementProps {
    firstColor?: p5.Color,
    secondColor? : p5.Color
}
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

    public static createWifiSignal(rate: number, props: WifiSignalProps): WifiSignal{
        return new WifiSignal(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "wifiSignal"),
            rate) 
    }

    public static createBarsSignal(rate: number, props: WifiSignalProps): BarsSignal{
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

    public static createArrowGauge(percent: number, props:ArrowGaugeProps): ArrowGauge{
        return new ArrowGauge(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "arrowGauge"),
            percent) 
    }

    public static createGauge(percent: number, props:GaugeProps): Gauge{
        const element =  new Gauge(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "gauge"),
            percent)
        if (props.firstColor){    
            element.withFirstColor(props.firstColor)
        }
        if (props.secondColor){
            element.withSecondColor(props.secondColor)
        } 
        return element
    }

    public static createGauge2(percent: number, props: FactoryGaugeProps): Gauge2{
        return new Gauge2(
            percent, 
            {
                id: props.id?? "-1", 
                pxSize: Elements.getSize(props.size?? "m", "gauge"),
                firstColor: props.firstColor,
                secondColor: props.secondColor
            }
        )
    }

    public static createStripedGauge(percent: number, props : StripedGaugeProps){
        return new StripedGauge(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "stripedGauge"),
            percent) 
    }

    public static createProgressBar(percent: number, props : ProgressBarProps): ProgressBar{
        const element =  new ProgressBar(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "progressBar"),
            percent) 
            if (props.firstColor){    
                element.withFirstColor(props.firstColor)
            }
            if (props.secondColor){
                element.withSecondColor(props.secondColor)
            } 
            return element
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
