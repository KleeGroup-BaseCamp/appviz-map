import {n3on} from "../../neon"
import {View, Layer, LayerBuilder, GridLayerBuilder, ProgressBar, StripedProgressBar, Caption, Card, PxSize} from "../../neon"
import {Icons} from "../../appViz/components"

export class DemoViewProgressBar implements View {

    public provideLayers(): Layer[] {
        const pxSize = new PxSize(300, 100)
        const captionSize = new PxSize(1000, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/progress bar", {}))
                .build(),
            new GridLayerBuilder()
                .addComponent(new ProgressBar(0, {size:pxSize}))
                .addComponent(new ProgressBar(50, {
                        size:pxSize,
                        firstColor : n3on.getStyle().color.b}))
                .addComponent(new ProgressBar(100,{
                    size:pxSize,
                    firstColor : n3on.getStyle().color.a,
                    secondColor : n3on.getStyle().color.c}))
                .beginRow(10)
                .addComponent(new Caption("ProgressBar", {size: captionSize}))
                .beginRow()
                .addComponent(new StripedProgressBar(0,{size:pxSize}))
                .addComponent(new StripedProgressBar(75, {size:pxSize, 
                    firstColor : n3on.getStyle().color.b,
                    secondColor: n3on.getStyle().color.c}))
                .addComponent(new StripedProgressBar(100,{size:pxSize, icon:Icons.getIcon("data") }))
                .beginRow(10)
                .addComponent(new Caption("StripedProgressBar", {size: captionSize}))
                .build()
            ]
    }
}