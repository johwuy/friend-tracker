import { ContactFormData } from "./contact-form-data";

export interface Contact extends ContactFormData {
  id: string;
}

export interface StringContact extends Omit<Contact, 'birthday'> {
  birthday: string | null;
}

export const CONTACT_LABEL_MAPPING: Record<keyof Contact, string>  = {
  id: 'Id',
  birthday: 'Birthday',
  email: 'Email',
  name: 'Name',
  phoneNumber: 'Phone Number',
  relationship: 'Relationship'
}
