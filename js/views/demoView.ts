import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Gauge, Light, Signal} from "../incubator" 
import { PxPosition, PxSize } from "../layout"

export class DemoView implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo"))
            .build(),
            new LayerBuilder()
            .addElement(new Light("-1", pxSize, color(255, 225, 0), 25), new PxPosition(100,200))
            .addElement(new Light("-1", pxSize, color(255, 225, 0), 50), new PxPosition(300,200))
            .addElement(new Light("-1", pxSize, color(255, 225, 0), 75), new PxPosition(500,200))
            .addElement(new Light("-1", pxSize, color(255, 225, 0), 100), new PxPosition(700,200))
            .addElement(new Gauge("-1", pxSize, 0),   new PxPosition(100,400))
            .addElement(new Gauge("-1", pxSize, 33),  new PxPosition(300,400))
            .addElement(new Gauge("-1", pxSize, 66),  new PxPosition(500,400))
            .addElement(new Gauge("-1", pxSize, 100), new PxPosition(700,400))
            .addElement(new Signal("-1", pxSize, 0), new PxPosition(100,600))
            .addElement(new Signal("-1", pxSize, 1), new PxPosition(250,600))
            .addElement(new Signal("-1", pxSize, 2), new PxPosition(400,600))
            .addElement(new Signal("-1", pxSize, 3), new PxPosition(550,600))
            .addElement(new Signal("-1", pxSize, 4), new PxPosition(700,600))
            .addElement(new Signal("-1", pxSize, 5), new PxPosition(850,600))
            .build()
        ]
    }
}