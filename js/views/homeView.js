class HomeView   {

    provideLayers(modelRepository, layout) {
        return  [
            new LayerBuilder()
            .addElement(new Card("home_main", projection.getGridWidth(), projection.getGridHeight(), "Home"))
            .build()
        ]
    }
}