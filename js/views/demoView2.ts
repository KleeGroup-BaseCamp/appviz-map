import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {SquareRating, HeartRating2, StarRating2} from "../incubator" 
import {PxPosition, PxSize} from "../layout"

export class DemoView2 implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(100, 100)
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo"))
            .build(),
            new LayerBuilder()
            .addElement(new SquareRating("-1", pxSize, 0), new PxPosition(100,150))
            .addElement(new SquareRating("-1", pxSize, 1), new PxPosition(250,150))
            .addElement(new SquareRating("-1", pxSize, 2.5), new PxPosition(400,150))
            .addElement(new SquareRating("-1", pxSize, 3), new PxPosition(550,150))
            .addElement(new SquareRating("-1", pxSize, 4.2), new PxPosition(700,150))
            .addElement(new SquareRating("-1", pxSize, 5), new PxPosition(850,150))
            .addElement(new HeartRating2("-1", pxSize, 0), new PxPosition(100,300))
            .addElement(new HeartRating2("-1", pxSize, 1), new PxPosition(250,300))
            .addElement(new HeartRating2("-1", pxSize, 2.5), new PxPosition(400,300))
            .addElement(new HeartRating2("-1", pxSize, 3), new PxPosition(550,300))
            .addElement(new HeartRating2("-1", pxSize, 4.2), new PxPosition(700,300))
            .addElement(new HeartRating2("-1", pxSize, 5), new PxPosition(850,300))
            .addElement(new StarRating2("-1", pxSize, 0), new PxPosition(100,450))
            .addElement(new StarRating2("-1", pxSize, 1), new PxPosition(250,450))
            .addElement(new StarRating2("-1", pxSize, 2.5), new PxPosition(400,450))
            .addElement(new StarRating2("-1", pxSize, 3), new PxPosition(550,450))
            .addElement(new StarRating2("-1", pxSize, 4.2), new PxPosition(700,450))
            .addElement(new StarRating2("-1", pxSize, 5), new PxPosition(850,450))
            .build()
        ]
    }
}