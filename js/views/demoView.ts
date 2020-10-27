import View from "./view"
import Layer from "../core/layer"
import LayerBuilder from "../core/layerBuilder"
import Card from "./elements/card"
import {projection} from "../sketch"
import ModelRepository from "../model/modelRepository"
import { Layout } from "../types/types"
export default class DemoView implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo"))
            .build()
        ]
    }
}

