import AnimationUtils from "../utils/animationUtils";
export default class State {
    #hoveredElement
    #selectedElement
    #dirty

    constructor() {
        this.#marksAsDirty()
    }

    /**
     *  A state is active if 
     *  - state has changed (dirty)
     *  - animation is running
     * 
     * @returns {boolean}
     */
    isActive() {
        const active = (this.#dirty || AnimationUtils.isActive())
        this.#cleanDirty()
        return active
    }
    #cleanDirty() {
        this.#dirty = false
    }

    #marksAsDirty() {
        this.#dirty = true
    }

    /**
     * Marks an element as Hovered
     * 
     * @param {VElement} element 
     */
    hover(element) {
        if (this.#hoveredElement !== element) {
            this.#hoveredElement = element
            this.#marksAsDirty()
        }
    }

    /**
     * Is the provided element in Hovered state
     * 
     * @param {VElement} element 
     * @returns {boolean}
     */
    isHovered(element) {
        return element === this.#hoveredElement
    }

    /**
     * Marks an element as Selected
     * 
     * @param {VElement} element 
     */
    select(element) {
        if (this.#selectedElement !== element) {
            this.#selectedElement = element
            this.#marksAsDirty()
        }
    }

    /**
     * Is the provided element currently selected
     * 
     * @param {VElement} element 
     * @returns {boolean}
     */
    isSelected(element) {
        return element === this.#selectedElement
    }

    /**
     * Completly reset the state
     */
    reset() {
        this.#hoveredElement = undefined
        this.#selectedElement = undefined
        this.#marksAsDirty()
    }

}