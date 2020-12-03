import {projection, style} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon/core"
import {Card, Icons} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {ProgressBar, StripedProgressBar, Caption} from "../incubator" 
import {PxSize} from "../neon/layout"

export class DemoViewProgressBar implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(300, 100)
        const pxSize2 = new PxSize(350, 100)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/progress bar"))
                .build(),
            new GridLayerBuilder()
                .addElement(new ProgressBar("-1", pxSize, 0))
                .addElement(new ProgressBar("-1", pxSize, 50)
                    .withFirstColor(style.color.b))
                .addElement(new ProgressBar("-1", pxSize, 100)
                    .withFirstColor(style.color.a)
                    .withSecondColor(style.color.c))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(1000, 35), "ProgressBar"))
                .beginRow()
                .addElement(new StripedProgressBar("-1", pxSize2, 0))
                .addElement(new StripedProgressBar("-1", pxSize2, 75).withColors(style.color.b, style.color.c))
                .addElement(new StripedProgressBar("-1", pxSize2, 100).withIcon(Icons.getIcon("data")))
                .beginRow(10)
                .addElement(new Caption("-1", new PxSize(1300, 35), "StripedProgressBar"))
                .build()
            ]
    }
}