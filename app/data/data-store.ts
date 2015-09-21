import {List, Item} from './models';

export default class DataStore{
  private static lists: List[];

  public static getLists(): List[] {
    return DataStore.lists;
  }

  public static getList(id: number): List {
    let list = DataStore.lists.filter(l => l.id === id);
    return list[0];
  }

  public static newList(name: string): List {
    let list = new List(name);
    DataStore.lists.push(list);
    return list;
  }

  public static renameList(id: number, name: string): List {
    let existingList = DataStore.getList(id);
    if (existingList) {
      existingList.name = name;
    }
    return existingList;
  }

  public static deleteList(id: number): boolean {
    let found = false;

    DataStore.lists = DataStore.lists.filter(l => {
      if (l.id === id) {
        found = true;
      }
      return l.id !== id
    });

    return found;
  }
}