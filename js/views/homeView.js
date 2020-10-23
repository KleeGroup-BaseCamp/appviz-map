import View from "./view"
import LayerBuilder from "../core/layerBuilder"
import Card from "./elements/card"
import {projection} from "../sketch"
export default class HomeView extends View {

    provideLayers(modelRepository, layout) {
        return  [
            new LayerBuilder()
            .addElement(new Card("home_main", projection.getPxSize(), "Home"))
            .build()
        ]
    }
}