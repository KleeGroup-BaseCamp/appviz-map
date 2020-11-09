import {AnimationUtils} from "../utils";
import { VElement } from "../core";

export class State {
    private hoveredElement: VElement | null
    private selectedElement: VElement | null
    private dirty: boolean

    constructor() {
        this.hoveredElement = null
        this.selectedElement = null
        this.dirty = true
    }

    /**
     *  A state is active if 
     *  - state has changed (dirty)
     *  - animation is running
     * 
     * @returns {boolean}
     */
    public isActive(): boolean {
        const active = (this.dirty || AnimationUtils.isActive())
        this.cleanDirty()
        return active
    }

    private cleanDirty(): void  {
        this.dirty = false
    }

    private marksAsDirty(): void  {
        this.dirty = true
    }

    /**
     * Marks an element as Hovered
     * 
     * @param {VElement} element 
     */
    public hover(element: VElement | null): void  {
        if (this.hoveredElement !== element) {
            this.hoveredElement = element
            this.marksAsDirty()
        }
    }

    /**
     * Is the provided element in Hovered state
     * 
     * @param {VElement} element 
     * @returns {boolean}
     */
    public isHovered(element: VElement): boolean {
        return element === this.hoveredElement
    }

    /**
     * Marks an element as Selected
     * 
     * @param {VElement} element 
     */
    public select(element: VElement): void  {
        if (this.selectedElement !== element) {
            this.selectedElement = element
            this.marksAsDirty()
        }
    }

    /**
     * Is the provided element currently selected
     * 
     * @param {VElement} element 
     * @returns {boolean}
     */
    public isSelected(element: VElement): boolean {
        return element === this.selectedElement
    }

    /**
     * Completly reset the state
     */
    public reset(): void {
        this.hoveredElement = null
        this.selectedElement = null
        this.marksAsDirty()
    }

}