import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {SquareRating, HeartRating, StarRating, ImageRating} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoViewRating implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 30)
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo Rating"))
            .build(),
            new LayerBuilder()
            .addElement(new SquareRating("-1", pxSize, 0), new PxPosition(100,150))
            .addElement(new SquareRating("-1", pxSize, 1), new PxPosition(250,150))
            .addElement(new SquareRating("-1", pxSize, 2.5), new PxPosition(400,150))
            .addElement(new SquareRating("-1", pxSize, 3), new PxPosition(550,150))
            .addElement(new SquareRating("-1", pxSize, 4.2), new PxPosition(700,150))
            .addElement(new SquareRating("-1", pxSize, 5), new PxPosition(850,150))
            .addElement(new HeartRating("-1", pxSize, 0), new PxPosition(100,200))
            .addElement(new HeartRating("-1", pxSize, 1), new PxPosition(250,200))
            .addElement(new HeartRating("-1", pxSize, 2.5), new PxPosition(400,200))
            .addElement(new HeartRating("-1", pxSize, 3), new PxPosition(550,200))
            .addElement(new HeartRating("-1", pxSize, 4.2), new PxPosition(700,200))
            .addElement(new HeartRating("-1", pxSize, 5), new PxPosition(850,200))
            .addElement(new StarRating("-1", pxSize, 0), new PxPosition(100,250))
            .addElement(new StarRating("-1", pxSize, 1), new PxPosition(250,250))
            .addElement(new StarRating("-1", pxSize, 2.5), new PxPosition(400,250))
            .addElement(new StarRating("-1", pxSize, 3), new PxPosition(550,250))
            .addElement(new StarRating("-1", pxSize, 4.2), new PxPosition(700,250))
            .addElement(new StarRating("-1", pxSize, 5), new PxPosition(850,250))
            .addElement(new ImageRating("-1", pxSize, 0).withImage(icons.star), new PxPosition(100,300))
            .addElement(new ImageRating("-1", pxSize, 1).withImage(icons.star), new PxPosition(250,300))
            .addElement(new ImageRating("-1", pxSize, 2.5).withImage(icons.star), new PxPosition(400,300))
            .addElement(new ImageRating("-1", pxSize, 3).withImage(icons.star), new PxPosition(550,300))
            .addElement(new ImageRating("-1", pxSize, 4.4).withImage(icons.star), new PxPosition(700,300))
            .addElement(new ImageRating("-1", pxSize, 5).withImage(icons.star), new PxPosition(850,300))
            .build()
        ]
    }
}