import {sketch} from "../../sketch"
import {VElement} from "../../core"

export class Background extends VElement {

 /**
  * @override
  */
  render(): void  {
    background(sketch.style.color.back )
  }
}
