import {PxSize } from "../../layout"
import {VElement, State} from "../../core"

export class Background extends VElement {
  private drawn = false
 
  constructor(id: any, pxSize: PxSize) {
    super(id, pxSize, false)
  }

  /**
  * @override
  */
  render(state : State): void  {   
    this.drawn = true
  }

  public needsClear(){
    return ! this.  drawn
  }
}
