import {projection, neon} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder, ArcToCircle, Caption, NeonCircles, 
    NeonTrails, PointsToCircle, SparkCircle, Card, PxSize} from "../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class DemoViewNeon implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200)
        const captionSize = new PxSize(200, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/neon", {size: projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addComponent(new NeonCircles({size: pxSize}))
                .addComponent(new ArcToCircle({size: pxSize}))
                .addComponent(new PointsToCircle({size: pxSize}))
                .addComponent(new SparkCircle({size: pxSize, color: neon.getStyle().color.a}))
                .addComponent(new NeonTrails({size: pxSize}))
                .beginRow(10)
                .addComponent(new Caption("Neon circles", {size: captionSize}))
                .addComponent(new Caption("Arc to circle", {size: captionSize}))
                .addComponent(new Caption("Points to circle", {size: captionSize}))
                .addComponent(new Caption("Spark circle", {size: captionSize}))
                .addComponent(new Caption("Neon trails", {size: captionSize}))
                .build()
            ]
    }
}