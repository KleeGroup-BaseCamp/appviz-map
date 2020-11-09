import {sketch, projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Light} from "../incubator" 
import { PxPosition, PxSize } from "../layout"

export class DemoView implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo"))
            .build(),
            new LayerBuilder()
            .addElement(new Light("-1", new PxSize(100, 100), color(255, 225, 0), 25), new PxPosition(100,200))
            .addElement(new Light("-1", new PxSize(100, 100), color(255, 225, 0), 50), new PxPosition(300,200))
            .addElement(new Light("-1", new PxSize(100, 100), color(255, 225, 0), 75), new PxPosition(500,200))
            .addElement(new Light("-1", new PxSize(100, 100), color(255, 225, 0), 100), new PxPosition(700,200))
            .build()
        ]
    }
}
