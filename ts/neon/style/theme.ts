const themeNames = ["dark", "light"] as const
export type ThemeName = typeof themeNames[number]
export const isThemeName = (name: string): name is ThemeName => 
    themeNames.includes(name as ThemeName)

export interface Theme{
    a: string,
    b: string,
    c: string, 
    d: string, 
    back: string, 
    middle: string,  
    front: string, 
    undefined: string,
    text:{
        primary: string,
        secondary: string
    }
}