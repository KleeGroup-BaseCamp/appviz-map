import {style} from "../../sketch"
import {VElement} from "../../core"

export class Background extends VElement {

 /**
  * @override
  */
  render(): void  {
    background(style.color.back )
  }
}
