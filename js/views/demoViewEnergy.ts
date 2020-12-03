import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon/core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Battery, Caption, Light} from "../incubator" 
import {PxSize} from "../neon/layout"

export class DemoViewEnergy implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 150)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/energy"))
                .build(),
            new GridLayerBuilder()
                .addElement(new Battery("-1", pxSize, 15))
                .addElement(new Battery("-1", pxSize, 50))
                .addElement(new Battery("-1", pxSize, 75))
                .addElement(new Battery("-1", pxSize, 100))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(550, 35), "Battery"))
                .beginRow()
                .addElement(new Light("-1", pxSize, 25))
                .addElement(new Light("-1", pxSize, 50))
                .addElement(new Light("-1", pxSize, 75)
                    .withColor( color('cyan')))
                .addElement(new Light("-1", pxSize, 100))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(550, 35), "Light"))
                .build()
        ]
    }
}