export interface WriteEventPayload {
  action: "add" | "update" | "delete";
  data: any;
  collection: "messages" | "contacts";
}
