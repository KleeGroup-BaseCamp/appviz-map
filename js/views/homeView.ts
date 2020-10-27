import View from "./view"
import LayerBuilder from "../core/layerBuilder"
import Card from "./elements/card"
import {projection} from "../sketch"
import ModelRepository from "../model/modelRepository"
import { Layout } from "../types/types"
export default class HomeView implements View {

    provideLayers(modelRepository: ModelRepository, layout: Layout) {
        return  [
            new LayerBuilder()
            .addElement(new Card("home_main", projection.getPxSize(), "Home"))
            .build()
        ]
    }
}