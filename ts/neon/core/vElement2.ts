import {PxSize} from "../layout"
import { VElement } from "./velement"

type Size = "s" | "m" | "l"

export interface VElementProps {
    id?: any,
    size? : Size|PxSize
}

export abstract class VElement2 extends VElement {

  /**
   * @constructor
   *
   * @param {*} id
   * @param {PxSize} pxSize
   * @param {boolean} selectable
   */
  constructor(props : VElementProps, selectable:boolean) {
    super(props.id??VElement2.generateId(), VElement2.buildPxSize(props.size), selectable)
  }

  private static buildPxSize(size? : Size|PxSize): PxSize {
    if (size instanceof PxSize){
      return size
    } else if (size){
//      return 
    }
    return new PxSize(666) //undefined
  }

  private static generateId():number {
    return -1
  }
}