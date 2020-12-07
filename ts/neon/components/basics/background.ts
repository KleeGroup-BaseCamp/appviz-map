import {ComponentProps} from "../.."
import {Component, State} from "../.."

export class Background extends Component {
  private drawn = false
 
  constructor(props: ComponentProps) {
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
