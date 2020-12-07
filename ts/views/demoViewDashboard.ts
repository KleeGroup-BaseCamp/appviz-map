import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder} from "../neon"
import {Card} from "./elements"
import {ModelRepository} from "../model"
import {Layout} from "../types"

import {Caption} from "../neon" 
import {PxSize, Gauge, ArrowGauge, StripedGauge, ProgressBar, WifiSignal, BarsSignal, StarRating, ImageRating, HeartRating} from "../neon"

export class DemoViewDashboard implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(20) // For testing purposes
        return  [
            new LayerBuilder()
                .addElement(new Card("Dashboard", {size: projection.getPxSize()}))
                .build(),
            // To fill later with "real word" information
                this.getGridLayerBuilder()
                .build()
            ]
    }

    private AddAllElements(gridLayerBuilder: GridLayerBuilder, size: "s" | "m" | "l"): GridLayerBuilder{
        return gridLayerBuilder
        .addElement(new WifiSignal(4, {size}))
        .addElement(new BarsSignal(3, {size}))
        .addElement(new ArrowGauge(50, {size}))
        .addElement(new Gauge(50, {size}))
        .addElement(new Gauge(50, {size}))
        .addElement(new StripedGauge(50, {size}))
        .beginRow(10)
        .addElement(new ProgressBar(50, {size}))
        .addElement(new ProgressBar(50, {size}))
        .addElement(new HeartRating(3, {size}))
        .addElement(new StarRating(3, {size}))
        .addElement(new ImageRating(3, {img:icons.star, size}))
        .beginRow(10)
        .addElement(new Caption(`Size ${size}`, {size: new PxSize(800, 35)}))
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