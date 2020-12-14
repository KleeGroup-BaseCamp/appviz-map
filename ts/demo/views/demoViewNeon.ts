import {projection} from "../../appViz/app"
import {n3on} from "../../neon"
import {Caption, View, Layer, LayerBuilder, GridLayerBuilder, Card, PxSize} from "../../neon"
import {NeonCircles, NeonTrails, ArcToCircle, PointsToCircle, SparkCircle, } from "../../demo"
    
export class DemoViewNeon implements View {

    public provideLayers(): Layer[] {
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
                .addComponent(new SparkCircle({size: pxSize, color: n3on.getStyle().color.a}))
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