import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {BlackHole2, BlackHole3, BlackHole4, Caption} from "../neon" 
import {PxSize} from "../neon"

export class DemoViewBlackHole implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200, 200)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/gauge 2"))
                .build(),
            new GridLayerBuilder()
                .addElement(new BlackHole4("-1", pxSize, 66))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(200, 35), "BlackHole 4"))
                .beginRow()
                .addElement(new BlackHole2("-1", pxSize, 66))
                .addElement(new BlackHole3("-1", pxSize, 66))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(200, 35), "BlackHole 2"))
                .addElement(new Caption("-1", new PxSize(200, 35), "BlackHole 3"))
                .build()
            ]
    }
}