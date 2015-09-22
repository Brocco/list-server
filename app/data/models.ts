export class List {
  constructor(public name: string) {
    this.id = IdMaker.getId();
    this.items = [];
  }

  public id: number;
  public items: Item[];
}

export class Item {
  constructor(public name: string){
    this.id = IdMaker.getId();
    this.completed = false;
  }

  public id: number;
  public completed: boolean;
}

class IdMaker {
  public static getId(): number {
    return IdMaker.lastId += 1;
  }

  private static lastId = 0;
}