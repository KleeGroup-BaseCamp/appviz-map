import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {ArcToCircle, Caption, NeonCircles,} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewNeon implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200, 200)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/neon"))
                .build(),
            new GridLayerBuilder()
                .addElement(new NeonCircles("-1", pxSize))
                .addElement(new ArcToCircle("-1", pxSize))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(200, 35), "Neon circles"))
                .addElement(new Caption("-1", new PxSize(200, 35), "Arc to circle"))
                .build()
            ]
    }
}