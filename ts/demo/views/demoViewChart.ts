import {Projection, View, Layer, LayerBuilder, GridLayerBuilder, Caption, LineChart, BarChart, DonutChart, Card, PxSize} from "../../neon"
export class DemoViewChart implements View {
    private projection : Projection = Projection.buildProjection ()

    public provideLayers(): Layer[] {
        const pxSize = new PxSize(200, 200)
        const lineData = [{x: 0, y: 0}, {x: 20, y: 40}, {x:40, y: 80}, {x:60, y: 20}, {x: 100, y: 100}]
        const barData = [{x: "Jan", y: 0}, {x: "Feb", y: 40}, {x: "Mar", y: 80}, {x: "Apr", y: 20}, {x: "May", y: 100}]
        const donutData = [{label: "label1", value: 50}, {label: "label2", value: 100}, {label: "label3", value: 50}]
        const captionSize = new PxSize(200, 35)
        return  [
            new LayerBuilder()
                .addComponent(new Card("components/chart", {size: this.projection.getPxSize()}))
                .build(),
            new GridLayerBuilder()
                .addComponent(new LineChart(lineData, {size: pxSize}))
                .addComponent(new LineChart(lineData, {size: pxSize, fill: true}))
                .addComponent(new BarChart(barData, {size: pxSize}))
                .addComponent(new DonutChart(donutData, {size: pxSize}))
                .beginRow(10)
                .addComponent(new Caption("Line chart", {size: captionSize}))
                .addComponent(new Caption("Filled line chart", {size: captionSize}))
                .addComponent(new Caption("Bar chart", {size: captionSize}))
                .addComponent(new Caption("Donut chart", {size: captionSize}))
                .build()
            ]
    }
}