import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {DiscreteCircularProgressBar, Gauge, ContinuousCircularProgressBar} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoViewGauge implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo Gauge"))
            .build(),
            new LayerBuilder()
            .addElement(new Gauge("-1", pxSize, 0),   new PxPosition(100,150))
            .addElement(new Gauge("-1", pxSize, 33),  new PxPosition(300,150))
            .addElement(new Gauge("-1", pxSize, 50),  new PxPosition(500,150))
            .addElement(new Gauge("-1", pxSize, 66),  new PxPosition(700,150))
            .addElement(new Gauge("-1", pxSize, 100), new PxPosition(900,150))
            .addElement(new DiscreteCircularProgressBar("-1", pxSize, 0), new PxPosition(100,300))
            .addElement(new DiscreteCircularProgressBar("-1", pxSize, 33), new PxPosition(300,300))
            .addElement(new DiscreteCircularProgressBar("-1", pxSize, 50), new PxPosition(500,300))
            .addElement(new DiscreteCircularProgressBar("-1", pxSize, 66), new PxPosition(700,300))
            .addElement(new DiscreteCircularProgressBar("-1", pxSize, 100), new PxPosition(900,300))
            .addElement(new ContinuousCircularProgressBar("-1", pxSize, 0), new PxPosition(100,500))
            .addElement(new ContinuousCircularProgressBar("-1", pxSize, 33), new PxPosition(300,500))
            .addElement(new ContinuousCircularProgressBar("-1", pxSize, 50), new PxPosition(500,500))
            .addElement(new ContinuousCircularProgressBar("-1", pxSize, 66), new PxPosition(700,500))
            .addElement(new ContinuousCircularProgressBar("-1", pxSize, 100), new PxPosition(900,500))
            .build()
        ]
    }
}