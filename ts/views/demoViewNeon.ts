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
                .addElement(new NeonCircles({size: pxSize}))
                .addElement(new ArcToCircle({size: pxSize}))
                .addElement(new PointsToCircle({size: pxSize}))
                .addElement(new SparkCircle({size: pxSize, color: style.color.a}))
                .addElement(new NeonTrails({size: pxSize}))
                .beginRow(10)
                .addElement(new Caption("Neon circles", {size: captionSize}))
                .addElement(new Caption("Arc to circle", {size: captionSize}))
                .addElement(new Caption("Points to circle", {size: captionSize}))
                .addElement(new Caption("Spark circle", {size: captionSize}))
                .addElement(new Caption("Neon trails", {size: captionSize}))
                .build()
            ]
    }
}