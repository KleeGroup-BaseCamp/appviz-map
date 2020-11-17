import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Battery, Light} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewBattery implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 150)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Demo Battery"))
                .build(),
            new GridLayerBuilder()
                .addElement(new Battery("-1", pxSize, 15))
                .addElement(new Battery("-1", pxSize, 50))
                .addElement(new Battery("-1", pxSize, 75))
                .addElement(new Battery("-1", pxSize, 100))
                .beginRow()
                .addElement(new Light("-1", pxSize, color(255, 225, 0), 25))
                .addElement(new Light("-1", pxSize, color(255, 225, 0), 50))
                .addElement(new Light("-1", pxSize, color(255, 225, 0), 75))
                .addElement(new Light("-1", pxSize, color(255, 225, 0), 100))
                .build()
        ]
    }
}