import {sketch, style} from "../../sketch"
import {VElement, State} from "../../core"

export class Background extends VElement {

 /**
  * @override
  */
  render(state : State): void  {
    background(style.color.back )
  }
}
