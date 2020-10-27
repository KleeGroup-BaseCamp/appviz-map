import ModelRepository from "../model/modelRepository";
import Layer from "../core/layer"
import {Layout} from "../types/types"

export default class View {

    public provideLayers(modelRepository?: ModelRepository, layout?: Layout): Layer[] {
        console.error("Render method MUST be overridden")
        return [new Layer([])]
    }     

}  