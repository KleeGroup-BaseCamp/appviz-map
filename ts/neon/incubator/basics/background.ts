import {VElementProps} from "../.."
import {VElement, State} from "../.."

export class Background extends VElement {
  private drawn = false
 
  constructor(props: VElementProps) {
    super(props, false)
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
