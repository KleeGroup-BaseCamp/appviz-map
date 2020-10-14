class State {
    #hoveredElement
    #selectedElement

    /**
     * Marks an element as Hovered
     * 
     * @param {Element} element 
     */
     hover(element) {
        this.#hoveredElement = element
    }

    /**
     * Is the provided element in Hovered state
     * 
     * @param {Element} element 
     * @return {boolean}
     */
    isHovered(element){
        return element === this.#hoveredElement
    }

    /**
     * Marks an element as Selected
     * 
     * @param {Element} element 
     */
    select(element) {
        this.#selectedElement = element
    }

    /**
     * Is the provided element currently selected
     * 
     * @param {Element} element 
     * @return {boolean}
     */
    isSelected(element){
        return element === this.#selectedElement
    }
}