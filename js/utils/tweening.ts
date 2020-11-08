export interface Tweening {
    /**
     * @param a : start 
     * @param c : change c = (b - a) 
     * @param r : ratio in [0;1]
     */
    do (a : number, c: number, r: number):number
}    