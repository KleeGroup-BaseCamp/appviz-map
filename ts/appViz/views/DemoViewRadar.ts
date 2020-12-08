import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder, SharpRadar, SmoothRadar, SharpRadar2, SmoothRadar2, Caption, Card, PxSize} from "../../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"
export class DemoViewRadar implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
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
            .addComponent(new Card("components/radar", {size: projection.getPxSize()}))
            .build(),
            new GridLayerBuilder()
            .addComponent(new SharpRadar(data[0], {size: pxSize}))
            .addComponent(new SharpRadar2(data[0], {size: pxSize}))
            .beginRow(10)
            .addComponent(new Caption("SharpRadar", {size: captionSize}))
            .addComponent(new Caption("SharpRadar2", {size: captionSize}))
            .beginRow()
            .addComponent(new SmoothRadar(data[0], {size: pxSize}))
            .addComponent(new SmoothRadar2(data[0], {size: pxSize}))
            .beginRow(10)
            .addComponent(new Caption("SmoothRadar", {size: captionSize}))
            .addComponent(new Caption("SmoothRadar2", {size: captionSize}))

            .build()
        ]
    }
}