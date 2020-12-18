import {Projection, View, Layer, LayerBuilder, Card, Grid} from "../../neon"

export class HomeView implements View {
    private projection : Projection = Projection.buildProjection ()

    public provideLayers(): Layer[] {
        return  [
            new LayerBuilder()
                .addComponent(new Card("Home", {size: this.projection.getPxSize()}))
                .addComponent(new Grid(12, 12, {size: this.projection.getPxSize()}))
                .build()
        ]
    }
}