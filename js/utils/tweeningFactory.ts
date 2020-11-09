import {Tweening} from "./tweening"

export class TweeningFactory {
    constructor(){}

    //http://gizma.com/easing/  
    public linear () : Tweening {
        return {
            do : (a, c, r) => a + c*r
        }
    }
    public easeOutSine ():Tweening {
        return {
            do : (a, c, r) => a + c * Math.sin(r * (Math.PI/2))
        }
    }
}