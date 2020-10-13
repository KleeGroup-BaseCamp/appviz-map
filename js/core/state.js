class State {
    #hoveredElement
    #selectedElement

    /**
     * Marks an element as Hovered
     */
    hover(element) {
        this.#hoveredElement = element
    }


    /**
     * Is the provided element in Hovered state
     */
    isHovered(element){
        return element === this.#hoveredElement
    }


    /**
     * Marks an element as Selected
     */
    select(element) {
        this.#selectedElement = element
    }

     /**
     * Return the selected element on the map
     */
    getSelectedElement(){
        return this.#selectedElement;
    }

    /**
     * Is the provided element currently selected
     */
    isSelected(element){
        return element === this.#selectedElement
    }
}