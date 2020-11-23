import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {SquareRating, HeartRating, StarRating, ImageRating, Caption} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewRating implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 30)
        const captionpxSize = new PxSize(850, 35)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "elements/rating"))
                .build(),
            new GridLayerBuilder()
                .addElement(new SquareRating("-1", pxSize, 0))
                .addElement(new SquareRating("-1", pxSize, 1))
                .addElement(new SquareRating("-1", pxSize, 2.5))
                .addElement(new SquareRating("-1", pxSize, 3))
                .addElement(new SquareRating("-1", pxSize, 4.2))
                .addElement(new SquareRating("-1", pxSize, 5))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "SquareRating"))
                .beginRow()
                .addElement(new HeartRating("-1", pxSize, 0))
                .addElement(new HeartRating("-1", pxSize, 1))
                .addElement(new HeartRating("-1", pxSize, 2.5))
                .addElement(new HeartRating("-1", pxSize, 3))
                .addElement(new HeartRating("-1", pxSize, 4.2))
                .addElement(new HeartRating("-1", pxSize, 5))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "HeartRating"))
                .beginRow()
                .addElement(new StarRating("-1", pxSize, 0))
                .addElement(new StarRating("-1", pxSize, 1))
                .addElement(new StarRating("-1", pxSize, 2.5))
                .addElement(new StarRating("-1", pxSize, 3))
                .addElement(new StarRating("-1", pxSize, 4.2))
                .addElement(new StarRating("-1", pxSize, 5))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "StarRating"))
                .beginRow()
                .addElement(new ImageRating("-1", pxSize, 0).withImage(icons.star))
                .addElement(new ImageRating("-1", pxSize, 1).withImage(icons.star))
                .addElement(new ImageRating("-1", pxSize, 2.5).withImage(icons.star))
                .addElement(new ImageRating("-1", pxSize, 3).withImage(icons.star))
                .addElement(new ImageRating("-1", pxSize, 4.4).withImage(icons.star))
                .addElement(new ImageRating("-1", pxSize, 5).withImage(icons.star))
                .beginRow(10)
                .addElement(new Caption("-1", captionpxSize, "ImageRating"))
                .build()
        ]
    }
}