import View from "./view"
import LayerBuilder from "../core/layerBuilder"
import Card from "./elements/card"
import {projection} from "../sketch"
export default class DemoView extends View {

    provideLayers(modelRepository, layout) {
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo"))
            .build()
        ]
    }
}