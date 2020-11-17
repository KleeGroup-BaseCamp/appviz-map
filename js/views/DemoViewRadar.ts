import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {SharpRadar, SmoothRadar} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoViewRadar implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(400, 400)
        const values = Array.from({length: 2}, v => Array.from({length: 8}, v => random() * 100))
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo Radar"))
            .build(),
            new LayerBuilder()
            .addElement(new SharpRadar("-1", pxSize, values[0]),   new PxPosition(50,150))
            .addElement(new SmoothRadar("-1", pxSize, values[0]),   new PxPosition(50,550))

            .addElement(new SharpRadar("-1", pxSize, values[1]),  new PxPosition(500,150))
            .addElement(new SmoothRadar("-1", pxSize, values[1]),  new PxPosition(500,550))

            .build()
        ]
    }
}