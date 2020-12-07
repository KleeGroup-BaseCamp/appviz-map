import {sketch, projection} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder} from "../neon"
import {Card, Grid} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class HomeView implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        return  [
            new LayerBuilder()
                .addElement(new Card("Home", {size: projection.getPxSize()}))
                .addElement(new Grid(12, 12, {size: projection.getPxSize()}))
                .build()
        ]
    }
}