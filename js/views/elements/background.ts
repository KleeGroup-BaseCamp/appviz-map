import {VElement} from "../../core/index"
import {style} from "../../sketch"
export class Background extends VElement {

 /**
  * @override
  */
  render(): void  {
    background(style.color.back )
  }
}
