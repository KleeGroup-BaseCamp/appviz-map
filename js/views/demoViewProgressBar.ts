import {icons, projection, style} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card, Icons} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {BiColorProgressBar, StripesProgressBar} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewProgressBar implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(300, 100)
        const pxSize2 = new PxSize(400, 100)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Demo Gauge"))
                .build(),
            new GridLayerBuilder()
                .addElement(new BiColorProgressBar("-1", pxSize, 0))
                .addElement(new BiColorProgressBar("-1", pxSize, 50).withColors(style.color.b))
                .addElement(new BiColorProgressBar("-1", pxSize, 100).withColors(style.color.a, style.color.c))
                .beginRow()
                .addElement(new StripesProgressBar("-1", pxSize2, 0))
                .addElement(new StripesProgressBar("-1", pxSize2, 75).withColors(style.color.b, style.color.c))
                .addElement(new StripesProgressBar("-1", pxSize2, 100).withIcon(Icons.getIcon("data")))
                .build()
            ]
    }
}