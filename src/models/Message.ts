import { Base } from "./Base";

export interface Message extends Base {
  title: string;
  body: string;
  recipients: {
    contactId: string;
    result: MessageResult;
  }[]; // Contact IDs
  imageUrl?: string;
  startDate?: Date;
  endDate?: Date;
  state: MessageState;
}

export enum MessageResult {
  PENDING = "PENDIENTE",
  DONE = "RECIBIDO",
  FAILED = "FALLIDO",
}

export enum MessageState {
  DRAFT = "BORRADOR",
  SCHEDULED = "PROGRAMADO",
  SENT = "FINALIZADO",
  FAILED = "FALLIDO",
}
