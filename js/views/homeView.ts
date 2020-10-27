import {Layer, LayerBuilder} from "../core/index"
import {Card} from "./elements/index"
import {View} from "./view"
import {projection} from "../sketch"
import {ModelRepository} from "../model/index"
import {Layout} from "../types/index"

export class HomeView implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        return  [
            new LayerBuilder()
            .addElement(new Card("home_main", projection.getPxSize(), "Home"))
            .build()
        ]
    }
}