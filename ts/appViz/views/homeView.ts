import {sketch} from "../app"
import {View, Layer, LayerBuilder, Card, Grid} from "../../neon"

export class HomeView implements View {

    public provideLayers(): Layer[] {
        return  [
            new LayerBuilder()
                .addComponent(new Card("Home", {size: sketch.projection.getPxSize()}))
                .addComponent(new Grid(12, 12, {size: sketch.projection.getPxSize()}))
                .build()
        ]
    }
}