class ModelBuilder {
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

  buildModelRepository() {
    const itemsModelsPerGroup = {}
    Object.keys(this.#notebook.sketches).forEach((itemName) => {
      const itemNamePrefix = itemName.slice(0, 2).toLowerCase()
        if (Object.keys(this.#types).includes(itemNamePrefix)){
          this.#addItem(itemsModelsPerGroup, itemName)
        }
    })

    const groupsModels = []
    Object.keys(this.#config).forEach(groupName => {
      groupsModels.push(
        new GroupModel(
          groupName,
          groupName,
          this.#config[groupName], // Zone name
          [],
          itemsModelsPerGroup[groupName] ?? []
        ))
    })

    return new ModelRepository(groupsModels)
  }

  #addItem(itemsModelsPerGroup, itemName){
    const groupName = this.#notebook.sketches[itemName].packageName.split(".")[2]
    const itemModel = new ItemModel(
          itemName, // id will go here later
          itemName, 
          this.#types[itemName.slice(0, 2).toLowerCase()], 
          [] // sections will go here later
        )
    if (Object.keys(itemsModelsPerGroup).includes(groupName)){
      itemsModelsPerGroup[groupName].push(itemModel)
    } else {
      itemsModelsPerGroup[groupName] = [itemModel]
    }
  }
}
