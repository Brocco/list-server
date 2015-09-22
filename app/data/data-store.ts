import {List, Item} from './models';

export default class DataStore{
  private static lists: List[] = [];

  public static getLists(): List[] {
    return this.lists;
  }

  public static getList(id: number): List {
    let lists = this.lists.filter(l => l.id === id);
    return lists[0];
  }

  public static newList(name: string): List {
    let list = new List(name);
    this.lists.push(list);
    return list;
  }

  public static renameList(id: number, name: string): List {
    let existingList = this.getList(id);
    if (existingList) {
      existingList.name = name;
    }
    return existingList;
  }

  public static deleteList(id: number): boolean {
    let found = false;

    this.lists = this.lists.filter(l => {
      if (l.id === id) {
        found = true;
      }
      return l.id !== id
    });

    return found;
  }

  public static getItems(listId: number): Item[] {
    let list = this.getList(listId);
    if (!list){
      throw 'invalid list id';
    }
    return list.items;
  }

  public static getItem(listId: number, itemId: number): Item {
    let list = this.getList(listId);
    if (!list){
      throw 'invalid list id';
    }
    let items = list.items.filter(l => l.id === itemId);
    return items[0];
  }

  public static addItem(listId: number, name: string): Item {
    let list = this.getList(listId);
    if (!list){
      throw 'invalid list id';
    }
    let item = new Item(name);
    list.items.push(item);
    return item;
  }

  public static renameItem(listId: number, itemId: number, name: string): Item {

    let list = this.getList(listId);
    if (!list){
      throw 'invalid list id';
    }
    let items = list.items.filter(l => l.id === itemId);
    let item = items[0];
    if (!item){
      throw 'invalid item id';
    }
    item.name = name;
    return item;
  }

  public static toggleItemCompletion(listId: number, itemId: number): Item {
    let list = this.getList(listId);
    if (!list){
      throw 'invalid list id';
    }
    let items = list.items.filter(l => l.id === itemId);
    let item = items[0];
    if (!item){
      throw 'invalid item id';
    }
    item.completed = !item.completed;
    return item;
  }
}