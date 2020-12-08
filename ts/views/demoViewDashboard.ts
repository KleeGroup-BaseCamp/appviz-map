import {projection, icons} from "../app"
import {View} from "./view"
import {Layer, LayerBuilder, GridLayerBuilder, PxSize, Gauge, ArrowGauge, StripedGauge,
     ProgressBar, WifiSignal, BarsSignal, StarRating, ImageRating, HeartRating, Caption, Card, StripedProgressBar} from "../neon"
import {ModelRepository} from "../model"
import {Layout} from "../types"

export class DemoViewDashboard implements View {

    public provideLayers(modelRepository: ModelRepository, layout: Layout): Layer[] {
        const pxSize = new PxSize(20) // For testing purposes
        return  [
            new LayerBuilder()
                .addComponent(new Card("Dashboard", {size: projection.getPxSize()}))
                .build(),
            // To fill later with "real word" information
                this.getGridLayerBuilder()
                .build()
            ]
    }

    private AddAllComponents(gridLayerBuilder: GridLayerBuilder, size: "s" | "m" | "l"): GridLayerBuilder{
        return gridLayerBuilder
        .addComponent(new WifiSignal(4, {size}))
        .addComponent(new BarsSignal(3, {size}))
        .addComponent(new ArrowGauge(50, {size}))
        .addComponent(new Gauge(50, {size}))
        .addComponent(new Gauge(50, {size, secondColor: color("pink")}))
        .addComponent(new StripedGauge(50, {size}))
        .beginRow(10)
        .addComponent(new ProgressBar(50, {size}))
        .addComponent(new HeartRating(3, {size}))
        .addComponent(new StarRating(3, {size}))
        .addComponent(new ImageRating(3, {img:icons.star, size}))
        .beginRow(10)
        .addComponent(new Caption(`Size ${size}`, {size: new PxSize(800, 35)}))
    }

    private getGridLayerBuilder(): GridLayerBuilder{
        const glb = new GridLayerBuilder()
        this.AddAllComponents(glb, "s")
        glb.beginRow()
        this.AddAllComponents(glb, "m")
        glb.beginRow()
        this.AddAllComponents(glb, "l")
        return glb
    }
}