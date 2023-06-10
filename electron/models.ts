export interface WriteEventPayload {
  action: Action;
  collection: Collection;
  data: CreatedItem[];
}

export type Collection = "messages" | "contacts";
export type Action = "add" | "update" | "delete";

export interface CollectionItems {
  [id: string]: CreatedItem;
}

export interface CreatedItem {
  id: string;
  createdAt: Date;
  [key: string]: any;
}
