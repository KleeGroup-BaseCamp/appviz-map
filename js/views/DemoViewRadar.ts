import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoViewRadar implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo Radar"))
            .build(),
            // new LayerBuilder()
            // .build()
        ]
    }
}