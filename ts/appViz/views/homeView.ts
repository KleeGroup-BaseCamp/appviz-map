import {projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, Card, Grid} from "../../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class HomeView implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        return  [
            new LayerBuilder()
                .addComponent(new Card("Home", {size: projection.getPxSize()}))
                .addComponent(new Grid(12, 12, {size: projection.getPxSize()}))
                .build()
        ]
    }
}