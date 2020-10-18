class DemoView   {

    provideLayers(modelRepository, layout) {
        return  [
            new LayerBuilder()
            .addElement(new Card("demo_main", projection.getGridWidth(), projection.getGridHeight(), "Démo"))
            .build()
        ]
    }
}