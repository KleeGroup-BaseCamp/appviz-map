import {AnimationUtils} from "../utils"
import { Component } from "."

export class State {
    private hoveredComponent: Component | null
    private selectedComponent: Component | null
    private dirty: boolean

    constructor() {
        this.hoveredComponent = null
        this.selectedComponent = null
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
     * Marks a component as Hovered
     * 
     * @param {Component} component 
     */
    public hover(component: Component | null): void  {
        if (this.hoveredComponent !== component) {
            this.hoveredComponent = component
            this.marksAsDirty()
        }
    }

    /**
     * Is the provided component in Hovered state
     * 
     * @param {Component} component 
     * @returns {boolean}
     */
    public isHovered(component: Component): boolean {
        return component === this.hoveredComponent
    }

    /**
     * Marks a component as Selected
     * 
     * @param {Component} component 
     */
    public select(component: Component): void  {
        if (this.selectedComponent !== component) {
            this.selectedComponent = component
            this.marksAsDirty()
        }
    }

    /**
     * Is the provided component currently selected
     * 
     * @param {Component} component 
     * @returns {boolean}
     */
    public isSelected(component: Component): boolean {
        return component === this.selectedComponent
    }

    /**
     * Completly reset the state
     */
    public reset(): void {
        this.hoveredComponent = null
        this.selectedComponent = null
        this.marksAsDirty()
    }

}