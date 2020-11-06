import {sketch, style} from "../../app"
import {VElement, State} from "../../core"

export class Background extends VElement {

 /**
  * @override
  */
  render(state : State): void  {
    background(style.color.back )
  }
}
