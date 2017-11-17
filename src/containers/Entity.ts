enum EntityType {
  folder,
  file,
}

abstract class Entity {
  public parent?: Folder;
  constructor(public type: EntityType, public name: string) {}

  getPath() {
    let path = this.name;
    let current = this.parent;
    while (current) {
      path = `${current.name}/${path}`;
      current = current.parent;
    }
  }
}

export class File extends Entity {
  constructor(name: string) {
    super(EntityType.file, name);
  }
}

export class Folder extends Entity {
  public children: Entity[] = [];

  constructor(name: string) {
    super(EntityType.folder, name);
  }

  addChild(child: Entity) {
    child.parent = this;
    this.children.push(child);
  }

  addChildren(children: Entity[]) {
    children.forEach(child => this.addChild(child));
  }
}
