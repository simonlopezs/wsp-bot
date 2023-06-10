import * as fs from "fs";
import * as path from "path";
import { Collection, CollectionItems, CreatedItem } from "./models";

type Action = "add" | "update" | "delete";

export class CollectionsHandler {
  private dataPath: string;
  constructor(publicPath: string) {
    this.dataPath = path.join(publicPath, "data");
  }

  write(action: Action, collection: Collection, data: any) {
    try {
      const items = this.getItems(collection);
      let _items: CollectionItems;
      switch (action) {
        case "add":
          _items = this.add(data, items);
          break;
        case "update":
          _items = this.update(data as CreatedItem, items);
          break;
        case "delete":
          _items = this.delete((data as CreatedItem).id, items);
          break;
      }
      if (!_items) return;
      fs.writeFileSync(
        path.join(this.dataPath, `${collection}.json`),
        JSON.stringify(_items)
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  read(collection: Collection, query?: any) {
    const items = this.getItems(collection);
    const itemsAsArray = Object.entries(items).map(([_, item]) => item);
    return itemsAsArray;
  }

  private add(data: any, items: CollectionItems): CollectionItems {
    const id = this.generateId();
    const _items = { ...items, [id]: { ...data, createdAt: new Date(), id } };
    return _items;
  }

  private update(data: CreatedItem, items: CollectionItems): CollectionItems {
    const { id } = data;
    const _items = { ...items, [id]: { ...items[id], ...data } };
    return _items;
  }

  private delete(id: string, items: CollectionItems): CollectionItems {
    const _items = { ...items };
    delete _items[id];
    return _items;
  }

  private getItems(collection: Collection) {
    const items = fs.readFileSync(
      path.join(this.dataPath, `${collection}.json`),
      "utf-8"
    );
    return JSON.parse(items);
  }

  private generateId() {
    const shuffle = (str: string) =>
      str
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");

    const id = String(
      shuffle(Date.now().toString(32)) + Math.random().toString(16)
    ).replace(/\./g, "");
    return id;
  }
}
