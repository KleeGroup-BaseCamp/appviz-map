import {ModelRepository} from "../model";
import {Layer} from "../neon/core"
import {Layout} from "../types"

export interface View {

    provideLayers(modelRepository?: ModelRepository, layout?: Layout): Layer[]

}  