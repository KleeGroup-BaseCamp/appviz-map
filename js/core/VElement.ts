import { PxSize } from "../layout/index";

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

export class VElement {
  private id: any;
  private pxSize: PxSize;
  private selectable: boolean;

  /**
   * @constructor
   *
   * @param {*} id
   * @param {PxSize} pxSize
   * @param {boolean} selectable
   */
  constructor(id: any, pxSize: PxSize, selectable: boolean) {
    this.id = id;
    this.pxSize = pxSize;
    this.selectable = selectable;
  }

  /**
   * @return {*} id
   */
  public getId(): any {
    return this.id;
  }

  /**
  * @return {number} width
  */
  public getWidth(): number {
    return this.pxSize.getWidth();
  }

  /**
   * @return {number} height
   */
  public getHeight(): number {
    return this.pxSize.getHeight();
  }

  /**
   * @return {PxSize} pxsize
   */
  public getPxSize(): PxSize {
    return this.pxSize;
  }
  /**
 * @returns {boolean} if the element is selectable
 */
  public isSelectable(): boolean {
    return this.selectable;
  }

  /**
   * This method MUST be overridden
   * This defines how the elemnt is rendererd inside a layer.
   */
  public render(): void {
    throw 'render method MUST be overridden';
  }

  /**
   * This method CAN be overridden
   *
   * @param {number} x
   * @param {number} y
   * @return {boolean} if the element contains the point (x, y)
   */
  public contains(x: number, y: number): boolean {
    return x > 0
      && x < this.pxSize.getWidth()
      && y > 0
      && y < this.pxSize.getHeight();
  }
}
