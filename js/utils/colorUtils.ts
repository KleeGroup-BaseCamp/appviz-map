import * as p5 from "p5"

export class ColorUtils {
        public static clone(c : p5.Color) : p5.Color {
        // Deep copy
        return  color(red(c), green(c), blue(c)) 
        }
} 