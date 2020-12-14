import {projection} from "../app"
import {View, Layer, LayerBuilder, Card, Grid} from "../../neon"

export class HomeView implements View {

    public provideLayers(): Layer[] {
        return  [
            new LayerBuilder()
                .addComponent(new Card("Home", {size: projection.getPxSize()}))
                .addComponent(new Grid(12, 12, {size: projection.getPxSize()}))
                .build()
        ]
    }
}