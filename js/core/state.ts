import AnimationUtils from "../utils/animationUtils";
import VElement from "./element";
export default class State {
    #hoveredElement: VElement | null = null
    #selectedElement: VElement | null = null
    #dirty: boolean = true

    constructor() {
        this.marksAsDirty()
    }

    /**
     *  A state is active if 
     *  - state has changed (dirty)
     *  - animation is running
     * 
     * @returns {boolean}
     */
    isActive(): boolean {
        const active = (this.#dirty || AnimationUtils.isActive())
        this.cleanDirty()
        return active
    }

    private cleanDirty() {
        this.#dirty = false
    }

    private marksAsDirty() {
        this.#dirty = true
    }

    /**
     * Marks an element as Hovered
     * 
     * @param {VElement} element 
     */
    hover(element: VElement | null) {
        if (this.#hoveredElement !== element) {
            this.#hoveredElement = element
            this.marksAsDirty()
        }
    }

    /**
     * Is the provided element in Hovered state
     * 
     * @param {VElement} element 
     * @returns {boolean}
     */
    isHovered(element: VElement): boolean {
        return element === this.#hoveredElement
    }

    /**
     * Marks an element as Selected
     * 
     * @param {VElement} element 
     */
    select(element: VElement) {
        if (this.#selectedElement !== element) {
            this.#selectedElement = element
            this.marksAsDirty()
        }
    }

    /**
     * Is the provided element currently selected
     * 
     * @param {VElement} element 
     * @returns {boolean}
     */
    isSelected(element: VElement): boolean {
        return element === this.#selectedElement
    }

    /**
     * Completly reset the state
     */
    reset() {
        this.#hoveredElement = null
        this.#selectedElement = null
        this.marksAsDirty()
    }

}