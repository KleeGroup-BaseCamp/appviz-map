import {Tweening} from "./tweening"

export class TweeningFactory {
    constructor(){}

    //http://gizma.com/easing/  
    public linear () : Tweening {
        return {
            do : (r) => r
        }
    }
    
    public easeOutSine ():Tweening {
        return {
            do : (r) => Math.sin(r * (Math.PI/2))
        }
    }
}