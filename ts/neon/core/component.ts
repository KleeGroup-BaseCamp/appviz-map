import {PxSize, PxPosition} from "../layout"
import {State, VEvent} from "."
import {neon} from "../../appViz/app"

type Size = "s" | "m" | "l"

export interface ComponentProps {
    id?: any,
    size? : Size|PxSize
}

/**
 * Component displayed on the map.
 *
 * An component is
 *  - displayed in a layer by the 'render' method.
 *  - a bounding box
 *  - selectable -or not-
 *
 * An component has
 * - an id
 * - a width
 * - a height
 *
 * An component must
 * - define a rendering method
 * - not depend each other
 *
 * An component can
 *  - define a specific 'contains' method to handle a specific shape
 */

//export type VEventHandler = (event : VEvent) =>{}

export abstract class Component {
  private readonly id: any
  private readonly pxSize: PxSize
  private readonly selectable: boolean
//  private eventHandler? : VEventHandler
  protected readonly centerPosition: PxPosition

  
  constructor(props: ComponentProps, name : string, selectable: boolean) {
    this.id = props.id ?? Component.generateId()
    this.pxSize = Component.buildPxSize(name, props.size)
    // this.pxSize = props.size as PxSize
    this.selectable = selectable
    this.centerPosition = new PxPosition(
      this.pxSize.getWidth() / 2, 
      this.pxSize.getHeight() / 2
    )
  }

  //public withEventHandler(eventHandler : VEventHandler){
  //  this.eventHandler = eventHandler
  //}

  /**
   * @return {*} id
   */
  public getId(): any {
    return this.id
  }

  /**
  * @return {number} width
  */
  public getWidth(): number {
    return this.pxSize.getWidth()
  }

  /**
   * @return {number} height
   */
  public getHeight(): number {
    return this.pxSize.getHeight()
  }

  /**
   * @return {PxSize} pxsize
   */
  public getPxSize(): PxSize {
    return this.pxSize
  }
  /**
 * @returns {boolean} if the component is selectable
 */
  public isSelectable(): boolean {
    return this.selectable
  }

  /**
   * This method MUST be overridden
   * This defines how the elemnt is rendererd inside a layer.
   */
  public abstract render(state :State): void

  /**
   * This method CAN be overridden
   *
   * @param {number} x
   * @param {number} y
   * @return {boolean} if the component contains the point (x, y)
   */
  public contains(x: number, y: number): boolean {
    return x > 0
      && x < this.pxSize.getWidth()
      && y > 0
      && y < this.pxSize.getHeight()
  }

 //public onEvent(event : VEvent): void {
 //   if (! this.eventHandler){
 //     throw 'no eventHandler registered'
 //   }
 //   this.eventHandler(event)
 // }

  public needsClear():boolean{
    return true
  }

  private static generateId():number {
    return -1
  }

  private static buildPxSize(name : string, size? : Size | PxSize): PxSize{
    if(size instanceof PxSize) {
      return size
    } 
    return neon.getStyle().pxSizes[name][(size ?? "m")]
  }
}
