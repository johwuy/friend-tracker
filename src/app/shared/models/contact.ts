import { ContactFormData } from "./contact-form-data";

export interface Contact extends ContactFormData {
  id: string;
}

export interface StringContact extends Omit<Contact, 'birthday'> {
  birthday: string | null;
}
