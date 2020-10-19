/**
 * Element displayed on the map.
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
class Element {
  #id
  #pxSize
  #selectable
 
  /**
   * @constructor
   * 
   * @param {*} id 
   * @param {PxSize} pxSize 
   * @param {boolean} selectable 
   */
  constructor (id, pxSize, selectable){
    this.#id = id
    this.#pxSize = pxSize
    this.#selectable = selectable
  }

  /**
   * @return {*} id
   */
  getId(){
    return this.#id
  }

  /**
  * @return {number} width
  */
  getWidth(){
    return this.#pxSize.getWidth()
  }  

  /**
   * @return {number} height
   */
  getHeight(){
    return this.#pxSize.getHeight()
  }  

  /**
   * @return {pxSize} pxsize
   */
  getPxSize(){
    return this.#pxSize
  }
    /**
   * @returns {boolean} if the element is selectable
   */
  isSelectable(){
    return this.#selectable
  }
  
  /**
   * This method MUST be overridden
   * This defines how the elemnt is rendererd inside a layer.
   */
  render() {
    throw 'render method MUST be overridden'
  }

  /**
   * This method CAN be overridden
   * 
   * @param {number} x 
   * @param {number} y 
   * @return {boolean} if the element contains the point (x, y)
   */
  contains(x, y) {
    return x > 0
        && x < this.#pxSize.getWidth()
        && y > 0
        && y < this.#pxSize.getHeight()
  }
}
