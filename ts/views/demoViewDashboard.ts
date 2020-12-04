import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Caption, Elements} from "../neon" 
import {PxSize, Gauge, ProgressBar, WifiSignal} from "../neon"

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
        .addElement( new WifiSignal(4, {size}))
        .addElement(Elements.createBarsSignal(3, {size}))
        .addElement(Elements.createArrowGauge(50, {size}))
        .addElement(new Gauge(50, {size}))
        .addElement(new Gauge(50, {size}))
        .addElement(Elements.createStripedGauge(50, {size}))
        .beginRow(10)
        .addElement(new ProgressBar(50, {size}))
        .addElement(Elements.createStripedProgressBar(50, {size}))
        .addElement(Elements.createHeartRating(3, {size}))
        .addElement(Elements.createStarRating(3, {size}))
        .addElement(Elements.createImageRating(3, {img:icons.star, size}))
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