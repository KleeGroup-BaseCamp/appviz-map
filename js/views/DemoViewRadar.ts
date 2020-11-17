import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Radar} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoViewRadar implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200, 200)
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo Radar"))
            .build(),
            new LayerBuilder()
            .addElement(new Radar("-1", pxSize, Array.from({length: 8}, v => random() * 100)),   new PxPosition(50,150))
            .addElement(new Radar("-1", pxSize, Array.from({length: 8}, v => random() * 100)),  new PxPosition(300,150))
            .addElement(new Radar("-1", pxSize, Array.from({length: 8}, v => random() * 100)),  new PxPosition(550,150))
            .addElement(new Radar("-1", pxSize, Array.from({length: 8}, v => random() * 100)),  new PxPosition(800,150))
            .addElement(new Radar("-1", pxSize, Array.from({length: 8}, v => random() * 100)), new PxPosition(1050,150))
            .build()
        ]
    }
}