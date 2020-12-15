import {Layer} from ".."

export type ViewParams = {[name:string]:any}

export interface View {
    provideLayers(): Layer[]
}  