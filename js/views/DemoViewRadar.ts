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
        const pxSize = new PxSize(200, 200)
        const values = Array.from({length: 5}, v => Array.from({length: 8}, v => random() * 100))
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo Radar"))
            .build(),
            new LayerBuilder()
            .addElement(new SharpRadar("-1", pxSize, values[0]),   new PxPosition(50,150))
            .addElement(new SmoothRadar("-1", pxSize, values[0]),   new PxPosition(50,400))

            .addElement(new SharpRadar("-1", pxSize, values[1]),  new PxPosition(300,150))
            .addElement(new SmoothRadar("-1", pxSize, values[1]),  new PxPosition(300,400))

            .addElement(new SharpRadar("-1", pxSize, values[2]),  new PxPosition(550,150))
            .addElement(new SmoothRadar("-1", pxSize, values[2]),  new PxPosition(550,400))

            .addElement(new SharpRadar("-1", pxSize, values[3]),  new PxPosition(800,150))
            .addElement(new SmoothRadar("-1", pxSize, values[3]),  new PxPosition(800,400))

            .addElement(new SharpRadar("-1", pxSize, values[4]), new PxPosition(1050,150))
            .addElement(new SmoothRadar("-1", pxSize, values[4]), new PxPosition(1050,400))

            .build()
        ]
    }
}