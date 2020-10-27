import ModelRepository from "../model/modelRepository";
import Layer from "../core/layer"
import {Layout} from "../types/types"

export default interface View {

    provideLayers(modelRepository?: ModelRepository, layout?: Layout): Layer[]

}  