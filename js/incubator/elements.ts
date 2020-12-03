import * as p5 from "p5"
import {PxSize} from "../layout"
import {VElement} from "../core"
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

type ElementsSizes = {
    [elementName: string]: {
        s: PxSize, 
        m: PxSize, 
        l: PxSize
    }
}

type Size = "s" | "m" | "l"

export interface ElementProps {
    id? : any,
    size? : Size,
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

export class Elements{
    private static readonly pxSizes: ElementsSizes = { // make keys type (elementNames) ?
        wifiSignal: {
            s: new PxSize(30), // change strokeWeight
            m: new PxSize(60), 
            l: new PxSize(90)
        },
        barsSignal: { // same size --> merge with wifiSignal ?
            s: new PxSize(30), 
            m: new PxSize(60), 
            l: new PxSize(90)
        },
        rating: { // All ratings (Abstract rating)
            s: new PxSize(80, 20), // TO DO: fix aliasing problems
            m: new PxSize(120, 30), 
            l: new PxSize(160, 40)
        },
        arrowGauge: { // merge with gauge ?
            s: new PxSize(50),
            m: new PxSize(100), 
            l: new PxSize(150) // Change radius (space wasted on bottom)
        },
        gauge: { 
            s: new PxSize(50), 
            m: new PxSize(100), 
            l: new PxSize(150)
        },
        stripedGauge: { // Merge with gauge ?
            s: new PxSize(50),
            m: new PxSize(100), 
            l: new PxSize(150)
        },
        progressBar: {
            s: new PxSize(100, 20), // font size: xxs
            m: new PxSize(150, 30), // font size: s
            l: new PxSize(200, 40) // font size: m
        },
        stripedProgressBar: {
            s: new PxSize(150, 50), // Change font size and paddings 
            m: new PxSize(200, 60), 
            l: new PxSize(300, 80)
        },
    }

    public static createWifiSignal(rate: number, props: WifiSignalProps): WifiSignal{
        return new WifiSignal(
            props.id?? -1,
            Elements.getSize(props.size?? "m", "wifiSignal"),
            rate) 
    }

    public static createBarsSignal(rate: number, props: WifiSignalProps): WifiSignal{
        return new WifiSignal(
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

    private static generateId(/* Determine signature later*/): any{
        return "-1"
    }

    public static getSize(size: Size, elementName: string): PxSize{
        return this.pxSizes[elementName][size]
    }
}
