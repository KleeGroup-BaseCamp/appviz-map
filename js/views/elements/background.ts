import VElement from "../../core/element"
import {style} from "../../sketch"
export default class Background extends VElement {

 /**
  * @override
  */
  render(): void  {
    background(style.color.back )
  }
}
