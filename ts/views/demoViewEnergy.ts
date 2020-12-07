import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Battery, Caption, Light} from "../neon" 
import {PxSize} from "../neon"

export class DemoViewEnergy implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 150)
        const captionSize = new PxSize(550, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("elements/energy", {size: projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addElement(new Battery(15, {size: pxSize}))
                .addElement(new Battery(50, {size: pxSize}))
                .addElement(new Battery(75, {size: pxSize}))
                .addElement(new Battery(100, {size: pxSize}))
                .beginRow(10)
                .addElement(new Caption("Battery", {size: captionSize}))
                .beginRow()
                .addElement(new Light(25, {size: pxSize}))
                .addElement(new Light(50, {size: pxSize}))
                .addElement(new Light(75, {size: pxSize, color: color('cyan')}))
                .addElement(new Light(100, {size: pxSize}))
                .beginRow(10)
                .addElement(new Caption("Light", {size: captionSize}))
                .build()
        ]
    }
}