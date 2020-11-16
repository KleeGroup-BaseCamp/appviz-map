import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Signal} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoViewSignal implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        const pxSize2 = new PxSize(100, 50) // For testing bounding boxes
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo Signal"))
            .build(),
            new LayerBuilder()
            .addElement(new Signal("-1", pxSize, 0), new PxPosition(100, 150))
            .addElement(new Signal("-1", pxSize, 1), new PxPosition(250, 150))
            .addElement(new Signal("-1", pxSize, 2), new PxPosition(400, 150))
            .addElement(new Signal("-1", pxSize, 3), new PxPosition(550, 150))
            .addElement(new Signal("-1", pxSize, 4), new PxPosition(700, 150))
            .addElement(new Signal("-1", pxSize, 5), new PxPosition(850, 150))
            .addElement(new Signal("-1", pxSize2, 0), new PxPosition(100, 300))
            .addElement(new Signal("-1", pxSize2, 1), new PxPosition(250, 300))
            .addElement(new Signal("-1", pxSize2, 2), new PxPosition(400, 300))
            .addElement(new Signal("-1", pxSize2, 3), new PxPosition(550, 300))
            .addElement(new Signal("-1", pxSize2, 4), new PxPosition(700, 300))
            .addElement(new Signal("-1", pxSize2, 5), new PxPosition(850, 300))
            .build()
        ]
    }
}