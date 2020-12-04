import { VElement } from "."

export interface VEvent {
    readonly sourceElement: VElement   
    readonly action: string
    readonly payload? : any
}