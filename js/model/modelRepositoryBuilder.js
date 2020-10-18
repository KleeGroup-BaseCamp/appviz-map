class ModelRepositoryBuilder {
  #types = {
    dt: "data",
    tk: "task",
  }
  #notebook
  #config

  constructor(notebookPath, configPath) {
    this.#notebook = loadJSON(notebookPath)
    this.#config = loadJSON(configPath)
  }

  build() {
    const itemModelsPerGroup = {}
    Object.keys(this.#notebook.sketches).forEach((itemName) => {
      const itemNamePrefix = itemName.slice(0, 2).toLowerCase()
        if (Object.keys(this.#types).includes(itemNamePrefix)){
          this.#addItem(itemModelsPerGroup, itemName)
        }
    })

    const groupModels = []
    Object.keys(this.#config).forEach(groupName => { // > groupId
      groupModels.push(
        new GroupModel(
          groupName, // id will go here later
          groupName,
          this.#config[groupName], // Zone name
          [], // sections will go here later
          itemModelsPerGroup[groupName] ?? []
        ))
    })

    return new ModelRepository(groupModels)
  }

  #addItem(itemModelsPerGroup, itemName){
    const groupName = this.#notebook.sketches[itemName].packageName.split(".")[2]
    const itemModel = new ItemModel(
          itemName, // id will go here later
          itemName, 
          this.#types[itemName.slice(0, 2).toLowerCase()], 
          [] // sections will go here later
        )
    if (Object.keys(itemModelsPerGroup).includes(groupName)){
      itemModelsPerGroup[groupName].push(itemModel)
    } else {
      itemModelsPerGroup[groupName] = [itemModel]
    }
  }
}
