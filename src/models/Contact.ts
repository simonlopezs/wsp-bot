import { Base } from "./Base";

export interface Contact extends Base {
  name: string;
  phone: string;
  email: string;
  commune: string;
  address: string;
  tags: string[];
}
