import {ComponentProps, Component, State} from "../../core"

export class Background extends Component {
  private drawn = false
 
  constructor(props: ComponentProps) {
    super(props, "Background", false)
  }

  /**
  * @override
  */
  render(state : State): void  {   
    this.drawn = true
  }

  public needsClear(){
    return ! this.drawn
  }
}
