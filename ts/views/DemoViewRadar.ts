import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {SharpRadar, SmoothRadar, SharpRadar2, SmoothRadar2, Caption} from "../neon" 
import {PxPosition, PxSize} from "../neon"

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
            .addElement(new Card("demo_main", projection.getPxSize(), "elements/radar"))
            .build(),
            new GridLayerBuilder()
            .addElement(new SharpRadar("-1", pxSize, data[0]))
            .addElement(new SharpRadar2("-1", pxSize, data[0]))
            .beginRow(10)
            .addElement(new Caption({text: "SharpRadar", size: captionSize}))
            .addElement(new Caption({text: "SharpRadar2", size: captionSize}))
            .beginRow()
            .addElement(new SmoothRadar("-1", pxSize, data[0]))
            .addElement(new SmoothRadar2("-1", pxSize, data[0]))
            .beginRow(10)
            .addElement(new Caption({text: "SmoothRadar", size: captionSize}))
            .addElement(new Caption({text: "SmoothRadar2", size: captionSize}))

            .build()
        ]
    }
}