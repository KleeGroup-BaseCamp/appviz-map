import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {LoadingBarWithWaves} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoViewBattery implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 150)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Démo Battery"))
                .build(),
            new GridLayerBuilder()
                .addElement(new LoadingBarWithWaves("-1", pxSize, 10))
                .addElement(new LoadingBarWithWaves("-1", pxSize, 50))
                .addElement(new LoadingBarWithWaves("-1", pxSize, 90))
                .build()
        ]
    }
}