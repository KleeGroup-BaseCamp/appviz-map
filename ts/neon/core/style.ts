import * as p5 from "p5"

export interface Style {
    readonly icon:  {  
        readonly font : p5.Font,
        readonly size : {
            readonly s:  number,
            readonly m:  number,
            readonly l:  number,
            readonly xl: number
        }
    },
    readonly text:  {    
        readonly font : p5.Font,
        readonly size : {
            readonly xxs: number,
            readonly xs: number,
            readonly s: number,
            readonly m: number,
            readonly l: number,
            readonly xl: number,
            readonly xxl: number,
            readonly default: number
        },
        readonly color: {
            readonly primary   : p5.Color, 
            readonly secondary : p5.Color
        }
    },
    readonly color: {
        /* colors */
        readonly a : p5.Color,
        readonly b : p5.Color,
        readonly c : p5.Color,
        readonly d : p5.Color,

        /* layer > back to front colors */
        readonly back   : p5.Color, 
        readonly middle : p5.Color, 
        readonly front  : p5.Color, 

        readonly undefined :  p5.Color
    }
}