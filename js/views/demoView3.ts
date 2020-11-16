import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {DiscreteCircularProgressBar, LoadingBarWithWaves} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoView3 implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo"))
            .build(),
            new LayerBuilder()
            .addElement(new LoadingBarWithWaves("-1", new PxSize(100, 150), 10), new PxPosition(100,150))
            .addElement(new LoadingBarWithWaves("-1", new PxSize(100, 150), 50), new PxPosition(250,150))
            .addElement(new LoadingBarWithWaves("-1", new PxSize(100, 150), 90), new PxPosition(400,150))
            .addElement(new DiscreteCircularProgressBar("-1", pxSize, 10), new PxPosition(100,350))
            .addElement(new DiscreteCircularProgressBar("-1", pxSize, 50), new PxPosition(250,350))
            .addElement(new DiscreteCircularProgressBar("-1", pxSize, 90), new PxPosition(400,350))
            .build()
        ]
    }
}