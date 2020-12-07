import {projection, style} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card, Icons} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {ProgressBar, StripedProgressBar, Caption} from "../neon" 
import {PxSize} from "../neon"

export class DemoViewProgressBar implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(300, 100)
        const captionSize = new PxSize(1000, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("elements/progress bar", {size: projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addElement(new ProgressBar(0, {size:pxSize}))
                .addElement(new ProgressBar(50, {
                        size:pxSize,
                        firstColor : style.color.b}))
                .addElement(new ProgressBar(100,{
                    size:pxSize,
                    firstColor : style.color.a,
                    secondColor : style.color.c}))
                .beginRow(10)
                .addElement(new Caption("ProgressBar", {size: captionSize}))
                .beginRow()
                .addElement(new StripedProgressBar(0,{size:pxSize}))
                .addElement(new StripedProgressBar(75, {size:pxSize, 
                    firstColor : style.color.b,
                    secondColor :style.color.c}))
                .addElement(new StripedProgressBar(100,{size:pxSize, icon:Icons.getIcon("data") }))
                .beginRow(10)
                .addElement(new Caption("StripedProgressBar", {size: captionSize}))
                .build()
            ]
    }
}