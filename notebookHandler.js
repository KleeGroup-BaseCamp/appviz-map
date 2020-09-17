class NotebookHandler {
  constructor(notebookPath) {
    this.notebook = loadJSON(notebookPath);
  }

  handle(mapBuilder) {
    let domains = this.#extractDomains();
    this.#generateLayersFromDomains(domains, mapBuilder);
  }

  #extractDomains() {
    let domains = {};
    Object.keys(this.notebook.sketches).map((sketchName) => {
      if (sketchName.slice(0, 2) === "Dt") {
        // TO DO : Use a function updateDomains() to simplify code
        let domainName = this.notebook.sketches[sketchName].packageName.split(
          "."
        )[2];
        if (domains[domainName]) {
          if (domains[domainName].objects)
            domains[domainName].objects.push(sketchName);
          else domains[domainName].objects = [sketchName];
        } else domains[domainName] = { objects: [sketchName] };
      } else if (sketchName.slice(0, 2) === "Tk") {
        let domainName = this.notebook.sketches[sketchName].packageName.split(
          "."
        )[2];
        if (domains[domainName]) {
          if (domains[domainName].tasks)
            domains[domainName].tasks.push(sketchName);
          else domains[domainName].tasks = [sketchName];
        } else domains[domainName] = { tasks: [sketchName] };
      }
    });
    return domains;
  }

  #generateLayersFromDomains(domains, mapBuilder) {
    const numOfDomains = Object.keys(domains).length;
    const numOfRows = Math.ceil(numOfDomains / 3) * 5;
    let layer1 = mapBuilder.addLayer(12, numOfRows);
    let layer2 = mapBuilder.addLayer(12, numOfRows);
    Object.keys(domains).forEach((domain, domainIndex) => {
      layer1.addElement(
        new Rectangle({
          column: (domainIndex % 3) * 4,
          row: numOfRows - 5 * (Math.floor(domainIndex / 3) + 1),
          numOfColumns: 4,
          numOfRows: 5,
          title: domain,
        })
      );

      if (domains[domain].objects) {
        domains[domain].objects.forEach((object, objectIndex) => {
          if (objectIndex < 4) {
            layer2.addElement(
              new Square({
                column: (domainIndex % 3) * 4 + objectIndex,
                row: numOfRows - 5 * (Math.floor(domainIndex / 3) + 1) + 1,
                numOfColumns: 1,
                numOfRows: 2,
                title:
                  objectIndex < 3 || domains[domain].objects.length == 4
                    ? object
                    : "More ...",
              })
            );
          }
        });
      }
      if (domains[domain].tasks) {
        domains[domain].tasks.forEach((task, taskIndex) => {
          if (taskIndex < 4) {
            layer2.addElement(
              new Square({
                column: (domainIndex % 3) * 4 + taskIndex,
                row: numOfRows - 5 * (Math.floor(domainIndex / 3) + 1) + 3,
                numOfColumns: 1,
                numOfRows: 2,
                title:
                  taskIndex < 3 || domains[domain].tasks.length == 4
                    ? task
                    : "More ...",
              })
            );
          }
        });
      }
    });
  }
}
