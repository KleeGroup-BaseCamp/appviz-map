import * as p5 from "p5"
import {Component} from "."

export type PositionedComponent = {
    pxPosition: p5.Vector, 
    component: Component
}
    
export class ComponentManager {
    private readonly positionedComponents: PositionedComponent[]
    
    constructor(positionedComponents: PositionedComponent[]) {
        this.positionedComponents = positionedComponents
    }
    
    public getAllPositionedComponents():PositionedComponent[]{
        return this.positionedComponents
    }

    /**
     * Finds the component positionned in (x, y)
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {?Component} component 
     */
    public findComponent(x: number, y: number): Component | null {
        for (let positionedComponent of this.positionedComponents) {
            if (positionedComponent.component.isSelectable()) {
            const lx = x - positionedComponent.pxPosition.x
            const ly = y - positionedComponent.pxPosition.y
            if (positionedComponent.component.contains(lx, ly)){
                return positionedComponent.component
            }  
            }
        }
        return null
    }   
}