import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../core"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Caption, Elements} from "../incubator" 
import {PxSize} from "../layout"

export class DemoViewDashboard implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(20) // For testing purposes
        return  [
            new LayerBuilder()
                .addElement(new Card("demo_main", projection.getPxSize(), "Dashboard"))
                .build(),
            // To fill later with "real word" information
                this.getGridLayerBuilder()
                .build()
            ]
    }

    private AddAllElements(gridLayerBuilder: GridLayerBuilder, size: "s" | "m" | "l"): GridLayerBuilder{
        return gridLayerBuilder
        .addElement(Elements.createWifiSignal(undefined, size, 4))
        .addElement(Elements.createBarsSignal(undefined, size, 3))
        .addElement(Elements.createArrowGauge(undefined, size, 50))
        .addElement(Elements.createGauge(undefined, size, 50))
        .addElement(Elements.createStripedGauge(undefined, size, 50))
        .beginRow(10)
        .addElement(Elements.createProgressBar(undefined, size, 50))
        .addElement(Elements.createStripedProgressBar(undefined, size, 50))
        .addElement(Elements.createHeartRating(undefined, size, 3))
        .addElement(Elements.createStarRating(undefined, size, 3))
        .addElement(Elements.createImageRating(undefined, size, 3, icons.star))
        .beginRow(10)
        .addElement(new Caption("-1", new PxSize(800, 35), `Size ${size}`))
    }

    private getGridLayerBuilder(): GridLayerBuilder{
        const glb = new GridLayerBuilder()
        this.AddAllElements(glb, "s")
        glb.beginRow()
        this.AddAllElements(glb, "m")
        glb.beginRow()
        this.AddAllElements(glb, "l")
        return glb
    }
}