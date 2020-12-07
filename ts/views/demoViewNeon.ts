import {projection, style} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {ArcToCircle, Caption, NeonCircles, NeonTrails, PointsToCircle, SparkCircle} from "../neon" 
import {PxSize} from "../neon"

export class DemoViewNeon implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200)
        const captionSize = new PxSize(200, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/neon"))
                .build(),
            new GridLayerBuilder()
                .addElement(new NeonCircles("-1", pxSize))
                .addElement(new ArcToCircle("-1", pxSize))
                .addElement(new PointsToCircle("-1", pxSize))
                .addElement(new SparkCircle("-1", pxSize).withColor(style.color.a))
                .addElement(new NeonTrails("-1", pxSize))
                .beginRow(10)
                .addElement(new Caption({text: "Neon circles", size: captionSize}))
                .addElement(new Caption({text: "Arc to circle", size: captionSize}))
                .addElement(new Caption({text: "Points to circle", size: captionSize}))
                .addElement(new Caption({text: "Spark circle", size: captionSize}))
                .addElement(new Caption({text: "Neon trails", size: captionSize}))
                .build()
            ]
    }
}