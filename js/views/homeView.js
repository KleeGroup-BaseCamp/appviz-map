class HomeView extends View {

    provideLayers(modelRepository, layout) {
        return  [
            new LayerBuilder()
            .addElement(new Card("home_main", projection.getPxSize(), "Home"))
            .build()
        ]
    }
}