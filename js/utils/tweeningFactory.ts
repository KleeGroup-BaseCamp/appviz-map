import {Tweening} from "./tweening"

/**
 * Easing Functions
 * 
 * http://gizma.com/easing/  
 * https://easings.net/
 */
export class TweeningFactory {
    constructor(){}

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

    public easeOutElastic(): Tweening {
        return {
            do : (r) => {
        const c4 = (2 * Math.PI) / 3;
        
        return Math.pow(2, -10 * r) * Math.sin((r * 10 - 0.75) * c4) + 1;
        }
        }
    }
}   