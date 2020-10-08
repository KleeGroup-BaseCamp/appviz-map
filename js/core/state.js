class State {
    selectedElement

    /**
     * Selects an element 
     * The previous selected element is unselected
     */
    select(element) {
        this.selectedElement = element
    }
}