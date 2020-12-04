import {PxSize, PxPosition} from "../layout"
import {State, VEvent} from "."
import { VElement } from "./velement"

/**
 * VElement displayed on the map.
 *
 * An element is
 *  - displayed in a layer by the 'render' method.
 *  - a bounding box
 *  - selectable -or not-
 *
 * An element has
 * - an id
 * - a width
 * - a height
 *
 * An element must
 * - define a rendering method
 * - not depend each other
 *
 * An element can
 *  - define a specific 'contains' method to handle a specific shape
 */

//export type VEventHandler = (event : VEvent) =>{}

export interface VElementProps {
    id: any,
    pxSize: PxSize,
    selectable?: boolean
}

export abstract class VElement2 extends VElement {
//  private eventHandler? : VEventHandler

  /**
   * @constructor
   *
   * @param {*} id
   * @param {PxSize} pxSize
   * @param {boolean} selectable
   */
  constructor(props : VElementProps) {
    super(props.id, props.pxSize, props.selectable ?? false)
  }
}
