import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Gauge, Light, Signal, SquareRating, HeartRating2, StarRating2, LoadingBarWithWaves} from "../incubator" 
import { PxPosition, PxSize } from "../layout"

export class DemoView2 implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo"))
            .build(),
            new LayerBuilder()
            // .addElement(new Light("-1", pxSize, color(255, 225, 0), 25), new PxPosition(100,150))
            // .addElement(new Light("-1", pxSize, color(255, 225, 0), 50), new PxPosition(300,150))
            // .addElement(new Light("-1", pxSize, color(255, 225, 0), 75), new PxPosition(500,150))
            // .addElement(new Light("-1", pxSize, color(255, 225, 0), 100), new PxPosition(700,150))
            // .addElement(new Gauge("-1", pxSize, 0),   new PxPosition(100,300))
            // .addElement(new Gauge("-1", pxSize, 33),  new PxPosition(300,300))
            // .addElement(new Gauge("-1", pxSize, 66),  new PxPosition(500,300))
            // .addElement(new Gauge("-1", pxSize, 100), new PxPosition(700,300))
            // .addElement(new Signal("-1", pxSize, 0), new PxPosition(100,450))
            // .addElement(new Signal("-1", pxSize, 1), new PxPosition(250,450))
            // .addElement(new Signal("-1", pxSize, 2), new PxPosition(400,450))
            // .addElement(new Signal("-1", pxSize, 3), new PxPosition(550,450))
            // .addElement(new Signal("-1", pxSize, 4), new PxPosition(700,450))
            // .addElement(new Signal("-1", pxSize, 5), new PxPosition(850,450))
            .addElement(new SquareRating("-1", pxSize, 0), new PxPosition(100,150))
            .addElement(new SquareRating("-1", pxSize, 1), new PxPosition(250,150))
            .addElement(new SquareRating("-1", pxSize, 2.5), new PxPosition(400,150))
            .addElement(new SquareRating("-1", pxSize, 3), new PxPosition(550,150))
            .addElement(new SquareRating("-1", pxSize, 4.2), new PxPosition(700,150))
            .addElement(new SquareRating("-1", pxSize, 5), new PxPosition(850,150))
            .addElement(new HeartRating2("-1", pxSize, 0), new PxPosition(100,300))
            .addElement(new HeartRating2("-1", pxSize, 1), new PxPosition(250,300))
            .addElement(new HeartRating2("-1", pxSize, 2.5), new PxPosition(400,300))
            .addElement(new HeartRating2("-1", pxSize, 3), new PxPosition(550,300))
            .addElement(new HeartRating2("-1", pxSize, 4.2), new PxPosition(700,300))
            .addElement(new HeartRating2("-1", pxSize, 5), new PxPosition(850,300))
            .addElement(new StarRating2("-1", pxSize, 0), new PxPosition(100,450))
            .addElement(new StarRating2("-1", pxSize, 1), new PxPosition(250,450))
            .addElement(new StarRating2("-1", pxSize, 2.5), new PxPosition(400,450))
            .addElement(new StarRating2("-1", pxSize, 3), new PxPosition(550,450))
            .addElement(new StarRating2("-1", pxSize, 4.2), new PxPosition(700,450))
            .addElement(new StarRating2("-1", pxSize, 5), new PxPosition(850,450))
            // .addElement(new LoadingBarWithWaves("-1", new PxSize(100, 150), 10), new PxPosition(1000,150))
            // .addElement(new LoadingBarWithWaves("-1", new PxSize(100, 150), 50), new PxPosition(1000,400))
            // .addElement(new LoadingBarWithWaves("-1", new PxSize(100, 150), 90), new PxPosition(1000,650))
            .build()
        ]
    }
}