export default class DemoView extends View {

    provideLayers(modelRepository, layout) {
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getPxSize(), "Démo"))
            .build()
        ]
    }
}