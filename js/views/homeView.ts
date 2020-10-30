import {projection} from "../sketch"
import {View} from "./view"
import {Layer, LayerBuilder} from "../core"
import {Card, Grid} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class HomeView implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        return  [
            new LayerBuilder()
            .addElement(new Card("home_main", projection.getPxSize(), "Home"))
            .addElement(new Grid("grid", projection.getPxSize(), 100, 100))
            .build()
        ]
    }
}