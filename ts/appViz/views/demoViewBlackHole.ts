import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder, Card, PxSize, BlackHole2, BlackHole3, BlackHole4, Caption} from "../../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class DemoViewBlackHole implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(200, 200)
        const captionSize = new PxSize(200, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/gauge 2", {size: projection.getPxSize()} ))
                .build(),
            new GridLayerBuilder()
                .addComponent(new BlackHole4(66, {size: pxSize}))
                .beginRow(10)
                .addComponent(new Caption("BlackHole 4", {size: captionSize}))
                .beginRow()
                .addComponent(new BlackHole2({size: pxSize}))
                .addComponent(new BlackHole3({size: pxSize}))
                .beginRow(10)
                .addComponent(new Caption("BlackHole 2", {size: captionSize}))
                .addComponent(new Caption("BlackHole 3", {size: captionSize}))
                .build()
            ]
    }
}