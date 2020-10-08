class State {
    selectedElement
    changed

    constructor() {
        this.changed = true
    }

    /**
     * Selects an element 
     * The previous selected element is unselected
     */
    select(element) {
        this.changed = (this.selectedElement != element)
        this.selectedElement = element;
    }
}