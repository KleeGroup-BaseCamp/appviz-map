import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {SquareRating, HeartRating, StarRating, ImageRating, CaptionedElement} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewRating implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 30)
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Démo Rating"))
                .build(),
            new GridLayerBuilder()
                .addElement(new CaptionedElement("-1", new SquareRating("-1", pxSize, 0)))
                .addElement(new CaptionedElement("-1", new SquareRating("-1", pxSize, 1)))
                .addElement(new CaptionedElement("-1", new SquareRating("-1", pxSize, 2.5)))
                .addElement(new CaptionedElement("-1", new SquareRating("-1", pxSize, 3)))
                .addElement(new CaptionedElement("-1", new SquareRating("-1", pxSize, 4.2)))
                .addElement(new CaptionedElement("-1", new SquareRating("-1", pxSize, 5)))
                .beginRow()
                .addElement(new CaptionedElement("-1", new HeartRating("-1", pxSize, 0)))
                .addElement(new CaptionedElement("-1", new HeartRating("-1", pxSize, 1)))
                .addElement(new CaptionedElement("-1", new HeartRating("-1", pxSize, 2.5)))
                .addElement(new CaptionedElement("-1", new HeartRating("-1", pxSize, 3)))
                .addElement(new CaptionedElement("-1", new HeartRating("-1", pxSize, 4.2)))
                .addElement(new CaptionedElement("-1", new HeartRating("-1", pxSize, 5)))
                .beginRow()
                .addElement(new CaptionedElement("-1", new StarRating("-1", pxSize, 0)))
                .addElement(new CaptionedElement("-1", new StarRating("-1", pxSize, 1)))
                .addElement(new CaptionedElement("-1", new StarRating("-1", pxSize, 2.5)))
                .addElement(new CaptionedElement("-1", new StarRating("-1", pxSize, 3)))
                .addElement(new CaptionedElement("-1", new StarRating("-1", pxSize, 4.2)))
                .addElement(new CaptionedElement("-1", new StarRating("-1", pxSize, 5)))
                .beginRow()
                .addElement(new CaptionedElement("-1", new ImageRating("-1", pxSize, 0).withImage(icons.star)))
                .addElement(new CaptionedElement("-1", new ImageRating("-1", pxSize, 1).withImage(icons.star)))
                .addElement(new CaptionedElement("-1", new ImageRating("-1", pxSize, 2.5).withImage(icons.star)))
                .addElement(new CaptionedElement("-1", new ImageRating("-1", pxSize, 3).withImage(icons.star)))
                .addElement(new CaptionedElement("-1", new ImageRating("-1", pxSize, 4.4).withImage(icons.star)))
                .addElement(new CaptionedElement("-1", new ImageRating("-1", pxSize, 5).withImage(icons.star)))
                .build()
        ]
    }
}