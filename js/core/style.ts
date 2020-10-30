import * as p5 from "p5"

type SizeStyle = {[name: string] : number}

interface  IconStyle {
    font : p5.Font,
    size : SizeStyle
}

interface TextStyle  {
    font : p5.Font,
    size : SizeStyle,
    color: {
        primary   : p5.Color, 
        secondary : p5.Color
    }
}
/*interface TextColor  {
    primary   : p5.Color, 
    secondary : p5.Color
}    
*/
interface ColorStyle {
        /* colors */
        a : p5.Color,
        b : p5.Color,
        c : p5.Color,
        d : p5.Color,

        /* layer > back to front colors */
        back   : p5.Color, 
        middle : p5.Color, 
        front  : p5.Color, 

        undefined :  p5.Color
}

export interface Style {
    icon:  IconStyle,
    text:  TextStyle,
    color: ColorStyle
}
