import { ContactFormData } from "./contact-form-data";

export interface Contact extends ContactFormData {
  id: string;
}

export interface RawContact extends Omit<Contact, 'birthday'> {
  birthday: string | null;
}
