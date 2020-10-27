import {GroupModel} from "./groupModel";
import {ItemModel} from "./itemModel";
import {ModelRepository} from "./modelRepository";
import {ItemNamePrefix, ItemTypeName} from "../types/index"

type Notebook = {sketches: {[itemName: string]: object}}
type Config = {[zoneName: string]: string}
type ItemModelsPerGroup = {[groupName: string]: ItemModel[]}
type ItemWithPackageName = {packageName: string, [field: string]: string}


export class ModelRepositoryBuilder {
  private types: {[itemNamePrefix in ItemNamePrefix]: ItemTypeName} = {
    dt: "data",
    tk: "task",
  }
  private notebook: Notebook 
  private config: Config

  constructor(notebookPath: string, configPath: string) {
    this.notebook = loadJSON(notebookPath) as Notebook
    this.config = loadJSON(configPath) as Config
  }

  public build(): ModelRepository {
    const itemModelsPerGroup: ItemModelsPerGroup = {}
    Object.keys(this.notebook.sketches).forEach((itemName) => {
      const itemNamePrefix = itemName.slice(0, 2).toLowerCase()
        if (Object.keys(this.types).includes(itemNamePrefix)){
          this.addItem(itemModelsPerGroup, itemName)
        }
    })

    const groupModels: GroupModel[] = []
    Object.keys(this.config).forEach(groupName => { // > groupId
      groupModels.push(
        new GroupModel(
          groupName, // id will go here later
          groupName,
          this.config[groupName], // Zone name
          [], // sections will go here later
          itemModelsPerGroup[groupName] ?? []
        ))
    })

    return new ModelRepository(groupModels)
  }

  private addItem(itemModelsPerGroup: ItemModelsPerGroup, itemName: string): void{
    const groupName = (this.notebook.sketches[itemName] as ItemWithPackageName).packageName.split(".")[2]
    const itemModel = new ItemModel(
          itemName, // id will go here later
          itemName, 
          this.types[itemName.slice(0, 2).toLowerCase() as ItemNamePrefix], 
          "",
          [] // sections will go here later
        )
    if (Object.keys(itemModelsPerGroup).includes(groupName)){
      itemModelsPerGroup[groupName].push(itemModel)
    } else {
      itemModelsPerGroup[groupName] = [itemModel]
    }
  }
}
