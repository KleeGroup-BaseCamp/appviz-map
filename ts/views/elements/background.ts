import {VElementProps} from "../../neon"
import {VElement, State} from "../../neon"

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
