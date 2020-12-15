import {sketch} from "../../appViz/app"
import {View, Layer, LayerBuilder, GridLayerBuilder, SharpRadar2, SmoothRadar2, Caption, Card, PxSize} from "../../neon"
export class DemoViewRadar implements View {

    public provideLayers(): Layer[] {
        const pxSize = new PxSize(250)
        const values = Array.from({length: 2}, v => Array.from({length: 8}, v => random() * 100))
        const labels = ["Weight", "Capacity", "Quality", "Power", "Popularity", "Size", "Density", "Intensity"]
        const data: any = [{}, {}]
        for (let i = 0; i < values[0].length; i++){
            data[0][labels[i]] = values[0][i]
            data[1][labels[i]] = values[1][i]
        }
        const captionSize = new PxSize(250, 35)
        return  [
            new LayerBuilder()
            .addComponent(new Card("components/radar", {size: sketch.projection.getPxSize()}))
            .build(),
            new GridLayerBuilder()
            .addComponent(new SharpRadar2(data[0], {size: pxSize}))
            .beginRow(10)
            .addComponent(new Caption("SharpRadar", {size: captionSize}))
            .beginRow()
            .addComponent(new SmoothRadar2(data[0], {size: pxSize}))
            .beginRow(10)
            .addComponent(new Caption("SmoothRadar", {size: captionSize}))
            .build()
        ]
    }
} 