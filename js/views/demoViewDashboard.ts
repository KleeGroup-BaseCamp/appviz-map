import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Elements} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewDashboard implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(20) // For testing purposes
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Dashboard"))
                .build(),
            new GridLayerBuilder()
            // To fill later with "real word" information
                .addElement(Elements.createWifiSignal(undefined, undefined, 4))
                .addElement(Elements.createBarsSignal(undefined, undefined, 3))
                .addElement(Elements.createArrowGauge(undefined, undefined, 50))
                .addElement(Elements.createGauge(undefined, undefined, 50))
                .addElement(Elements.createStripedGauge(undefined, undefined, 50))
                .beginRow()
                .addElement(Elements.createProgressBar(undefined, undefined, 50))
                .addElement(Elements.createStripedProgressBar(undefined, undefined, 50))
                .beginRow()
                .addElement(Elements.createHeartRating(undefined, undefined, 3))
                .addElement(Elements.createStarRating(undefined, undefined, 3))
                .addElement(Elements.createImageRating(undefined, undefined, 3, icons.star))
                .build()
            ]
    }
}