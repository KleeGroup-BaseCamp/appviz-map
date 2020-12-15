import {sketch, icons} from "../../appViz/app"
import {View, Layer, LayerBuilder, GridLayerBuilder, SquareRating, HeartRating, StarRating, ImageRating, Caption, Card, PxSize} from "../../neon"

export class DemoViewRating implements View {

    public provideLayers(): Layer[] {
        const pxSize = new PxSize(100, 30)
        const captionSize = new PxSize(850, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/rating", {size: sketch.projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addComponent(new SquareRating(0, {size:pxSize}))
                .addComponent(new SquareRating(1, {size:pxSize}))
                .addComponent(new SquareRating(2.5, {size:pxSize}))
                .addComponent(new SquareRating(3, {size:pxSize}))
                .addComponent(new SquareRating(4.2, {size:pxSize}))
                .addComponent(new SquareRating(5, {size:pxSize}))
                .beginRow(10)
                .addComponent(new Caption("SquareRating", {size: captionSize}))
                .beginRow()
                .addComponent(new HeartRating(0, {size:pxSize}))
                .addComponent(new HeartRating(1, {size:pxSize}))
                .addComponent(new HeartRating(2.5, {size:pxSize}))
                .addComponent(new HeartRating(3, {size:pxSize}))
                .addComponent(new HeartRating(4.2, {size:pxSize}))
                .addComponent(new HeartRating(5, {size:pxSize}))
                .beginRow(10)
                .addComponent(new Caption("HeartRating", {size: captionSize}))
                .beginRow()
                .addComponent(new StarRating(0, {size:pxSize}))
                .addComponent(new StarRating(1, {size:pxSize}))
                .addComponent(new StarRating(2.5, {size:pxSize}))
                .addComponent(new StarRating(3, {size:pxSize}))
                .addComponent(new StarRating(4.2, {size:pxSize}))
                .addComponent(new StarRating(5, {size:pxSize}))
                .beginRow(10)
                .addComponent(new Caption("StarRating", {size: captionSize}))
                .beginRow()
                .addComponent(new ImageRating(0, {size:pxSize, img:icons.star}))
                .addComponent(new ImageRating(1, {size:pxSize, img:icons.star}))
                .addComponent(new ImageRating(2.5, {size:pxSize, img:icons.star}))
                .addComponent(new ImageRating(3, {size:pxSize, img:icons.star}))
                .addComponent(new ImageRating(4.4, {size:pxSize, img:icons.star}))
                .addComponent(new ImageRating(5, {size:pxSize, img:icons.star}))
                .beginRow(10)
                .addComponent(new Caption("ImageRating", {size: captionSize}))
                .build()
        ]
    }
}