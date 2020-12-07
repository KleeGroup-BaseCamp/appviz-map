import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder, SquareRating, HeartRating, StarRating, ImageRating, Caption, Card, PxSize} from "../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class DemoViewRating implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 30)
        const captionSize = new PxSize(850, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("elements/rating", {size: projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addElement(new SquareRating(0, {size:pxSize}))
                .addElement(new SquareRating(1, {size:pxSize}))
                .addElement(new SquareRating(2.5, {size:pxSize}))
                .addElement(new SquareRating(3, {size:pxSize}))
                .addElement(new SquareRating(4.2, {size:pxSize}))
                .addElement(new SquareRating(5, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("SquareRating", {size: captionSize}))
                .beginRow()
                .addElement(new HeartRating(0, {size:pxSize}))
                .addElement(new HeartRating(1, {size:pxSize}))
                .addElement(new HeartRating(2.5, {size:pxSize}))
                .addElement(new HeartRating(3, {size:pxSize}))
                .addElement(new HeartRating(4.2, {size:pxSize}))
                .addElement(new HeartRating(5, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("HeartRating", {size: captionSize}))
                .beginRow()
                .addElement(new StarRating(0, {size:pxSize}))
                .addElement(new StarRating(1, {size:pxSize}))
                .addElement(new StarRating(2.5, {size:pxSize}))
                .addElement(new StarRating(3, {size:pxSize}))
                .addElement(new StarRating(4.2, {size:pxSize}))
                .addElement(new StarRating(5, {size:pxSize}))
                .beginRow(10)
                .addElement(new Caption("StarRating", {size: captionSize}))
                .beginRow()
                .addElement(new ImageRating(0, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(1, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(2.5, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(3, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(4.4, {size:pxSize, img:icons.star}))
                .addElement(new ImageRating(5, {size:pxSize, img:icons.star}))
                .beginRow(10)
                .addElement(new Caption("ImageRating", {size: captionSize}))
                .build()
        ]
    }
}