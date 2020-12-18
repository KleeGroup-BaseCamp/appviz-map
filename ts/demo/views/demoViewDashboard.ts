import {icons} from "../../appViz/app"
import {Projection, View, Layer, LayerBuilder, GridLayerBuilder, PxSize, Gauge, ArrowGauge, StripedGauge,
     ProgressBar, WifiSignal, BarsSignal, StarRating, ImageRating, HeartRating, Caption, Card} from "../../neon"

export class DemoViewDashboard implements View {
    public provideLayers(): Layer[] {
        return  [
            new LayerBuilder()
                .addComponent(new Card("Dashboard", {}))
                .build(),
            // To fill later with "real word" information
                this.getGridLayerBuilder()
                .build()
            ]
    }
    
    // Ce n'est pas propre mais ce n'est que pour tester
    private AddAllComponents(gridLayerBuilder: GridLayerBuilder, size: "s" | "m" | "l", displaySignal: boolean, displayRating: boolean): GridLayerBuilder{
        const glb = gridLayerBuilder
        if (displaySignal){
            glb
            .addComponent(new WifiSignal(4, {size}))
            .addComponent(new BarsSignal(3, {size}))
        }        
        glb
        .addComponent(new ArrowGauge(50, {size}))
        .addComponent(new Gauge(50, {size}))
        .addComponent(new Gauge(50, {size, secondColor: color("pink")}))
        .addComponent(new StripedGauge(50, {size}))
        .beginRow(10)
        .addComponent(new ProgressBar(50, {size}))
        if(displayRating){
            glb
            .addComponent(new HeartRating(3, {size}))
            .addComponent(new StarRating(3, {size}))
            .addComponent(new ImageRating(3, {img:icons.star, size}))
        }
        glb
        .beginRow(10)
        .addComponent(new Caption(`Size ${size}`, {size: new PxSize(800, 35)}))
        return glb
    }

    private getGridLayerBuilder(): GridLayerBuilder{
        const glb = new GridLayerBuilder()
        this.AddAllComponents(glb, "s", true, false)
        glb.beginRow()
        this.AddAllComponents(glb, "m", true, true)
        glb.beginRow()
        this.AddAllComponents(glb, "l", false, false)
        return glb
    }
}