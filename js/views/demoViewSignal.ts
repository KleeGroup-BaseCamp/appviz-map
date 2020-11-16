import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Signal} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewSignal implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        const pxSize2 = new PxSize(100, 50) // For testing bounding boxes
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Démo Signal"))
                .build(),
            new GridLayerBuilder()
                .addElement(new Signal("-1", pxSize, 0))
                .addElement(new Signal("-1", pxSize, 1))
                .addElement(new Signal("-1", pxSize, 2))
                .addElement(new Signal("-1", pxSize, 3))
                .addElement(new Signal("-1", pxSize, 4))
                .addElement(new Signal("-1", pxSize, 5))
                .beginRow()
                .addElement(new Signal("-1", pxSize2, 0))
                .addElement(new Signal("-1", pxSize2, 1))
                .addElement(new Signal("-1", pxSize2, 2))
                .addElement(new Signal("-1", pxSize2, 3))
                .addElement(new Signal("-1", pxSize2, 4))
                .addElement(new Signal("-1", pxSize2, 5))
                .build()
        ]
    }
}