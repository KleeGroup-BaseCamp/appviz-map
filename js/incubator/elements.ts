import {Image} from "p5"
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

type ElementsSizes = {
    [elementName: string]: {
        s: PxSize, 
        m: PxSize, 
        l: PxSize
    }
}

type Size = "s" | "m" | "l"

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

    public static createWifiSignal(id: any = this.generateId(), size: Size | PxSize = "m", rate: number): WifiSignal{
        return new WifiSignal(id, this.getSize(size ?? "m", "wifiSignal"), rate)
    }

    public static createBarsSignal(id: any = this.generateId(), size: Size | PxSize = "m", rate: number): BarsSignal{
        return new BarsSignal(id, this.getSize(size ?? "m", "barsSignal"), rate)
    }

    public static createHeartRating(id: any = this.generateId(), size: Size | PxSize = "m", rate: number): HeartRating{
        return new HeartRating(id, this.getSize(size ?? "m", "rating"), rate)
    }

    public static createStarRating(id: any = this.generateId(), size: Size | PxSize = "m", rate: number): StarRating{
        return new StarRating(id, this.getSize(size ?? "m", "rating"), rate)
    }

    // Leave image optional with possibility of method throwing error ?
    public static createImageRating(id: any = this.generateId(), size: Size | PxSize = "m", rate: number, image: Image): ImageRating{
        return new ImageRating(id, this.getSize(size ?? "m", "rating"), rate).withImage(image)
    }

    public static createArrowGauge(id: any = this.generateId(), size: Size | PxSize = "m", percent: number): ArrowGauge{
        return new ArrowGauge(id, this.getSize(size ?? "m", "arrowGauge"), percent)
    }

    public static createGauge(id: any = this.generateId(), size: Size | PxSize = "m", percent: number): Gauge{
        return new Gauge(id, this.getSize(size ?? "m", "gauge"), percent)
    }

    public static createStripedGauge(id: any = this.generateId(), size: Size | PxSize = "m", percent: number): StripedGauge{
        return new StripedGauge(id, this.getSize(size ?? "m", "stripedGauge"), percent)
    }

    public static createProgressBar(id: any = this.generateId(), size: Size | PxSize = "m", percent: number): ProgressBar{
        return new ProgressBar(id, this.getSize(size ?? "m", "progressBar"), percent)
    }

    public static createStripedProgressBar(id: any = this.generateId(), size: Size | PxSize = "m", percent: number): StripedProgressBar{
        return new StripedProgressBar(id, this.getSize(size ?? "m", "stripedProgressBar"), percent)
    }

    private static generateId(/* Determine signature later*/): any{
        return "-1"
    }

    private static getSize(size: Size | PxSize, elementName: string): PxSize{
        if (size instanceof PxSize) return size
        else return this.pxSizes[elementName][size]
    }
}