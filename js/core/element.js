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
  id
  width
  height
  selectable
 
  constructor (id, width, height, selectable){
    this.id = id
    this.width = width
    this.height = height
    this.selectable = selectable
  }

  getId(){
    return this.id
  }

  getWidth(){
    return this.width
  }

  getHeight(){
    return this.height
  }

  isSelectable(){
    return this.selectable
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
   */
  contains(x, y) {
    return x > 0
        && x < this.width
        && y > 0
        && y < this.height
  }
}
