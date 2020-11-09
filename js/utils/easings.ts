/**
 * Easing Functions
 * Function y = f(r)
 *  r in [0, 1]
 *  r = 0 => y = 0
 *  r = 1 => y = 1
 * 
 * WARNING : Some functions are out [0; 1]
 *  
 * r : stepRatio in [0;1]
 *  return [0; 1]
 * 
 * http://gizma.com/easing/  
 * https://easings.net/
 */
export class Easings {
    //cut the pie in 4 parts
    private readonly c4 = Math.PI / 2
    //cut the pie in 3 parts
    private readonly c3 = (2 * Math.PI) / 3

    constructor(){}

    public readonly linear  = (r:number) => r
    public readonly easeOutSine =  (r:number) => Math.sin(r * this.c4)
    public readonly easeOutElastic = (r:number) => Math.pow(2, -10 * r) * Math.sin((r * 10 - 0.75) * this.c3) + 1
}   