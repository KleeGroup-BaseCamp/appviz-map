import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {SquareRating, HeartRating, StarRating, ImageRating, Caption} from "../neon" 
import {PxSize} from "../neon"

export class DemoViewRating implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 30)
        const captionpxSize = new PxSize(850, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/rating"))
                .build(),
            new GridLayerBuilder()
                .addElement(new SquareRating(0, {size:pxSize}))
                .addElement(new SquareRating(1, {size:pxSize}))
                .addElement(new SquareRating(2.5, {size:pxSize}))
                .addElement(new SquareRating(3, {size:pxSize}))
                .addElement(new SquareRating(4.2, {size:pxSize}))
                .addElement(new SquareRating(5, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "SquareRating"))
                .beginRow()
                .addElement(new HeartRating(0, {size:pxSize}))
                .addElement(new HeartRating(1, {size:pxSize}))
                .addElement(new HeartRating(2.5, {size:pxSize}))
                .addElement(new HeartRating(3, {size:pxSize}))
                .addElement(new HeartRating(4.2, {size:pxSize}))
                .addElement(new HeartRating(5, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "HeartRating"))
                .beginRow()
                .addElement(new StarRating(0, {size:pxSize}))
                .addElement(new StarRating(1, {size:pxSize}))
                .addElement(new StarRating(2.5, {size:pxSize}))
                .addElement(new StarRating(3, {size:pxSize}))
                .addElement(new StarRating(4.2, {size:pxSize}))
                .addElement(new StarRating(5, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "StarRating"))
                .beginRow()
                .addElement(new ImageRating(0, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(1, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(2.5, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(3, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(4.4, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(5, {size:pxSize, img:icons.star}))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "ImageRating"))
                .build()
        ]
    }
}