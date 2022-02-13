import shortid from 'shortid';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { Form } from './ContactForm.styled';
import {
  useFetchContactsQuery,
  useAddContactMutation,
} from '../../services/contactsApi';
export default function ContactForm() {
  const [addContact, { isLoading }] = useAddContactMutation();
  const { data: contacts } = useFetchContactsQuery();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const nameInputId = shortid.generate();
  const phoneInputId = shortid.generate();
  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };
  const duplicateNameChecking = name =>
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
  const duplicateNumberChecking = phone =>
    contacts.find(contact => contact.phone === phone);
  const handleSubmit = event => {
    event.preventDefault();
    if (duplicateNameChecking(name)) {
      toast.error(`Sorry, but user ${name} name is already in contacts.`);
    } else if (duplicateNumberChecking(phone)) {
      toast.error(
        `Sorry, but user with ${phone} phone is already in contacts.`
      );
    } else
      addContact({ name, phone }) &&
        toast.success(
          `User ${name} with phone number ${phone} has been successfully added to the phone book.`
        );
    resetForm();
  };
  const resetForm = () => {
    setName('');
    setPhone('');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameInputId}
          value={name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor={phoneInputId}>
        Number
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={phoneInputId}
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading && <Spinner size={12} />} Add contact
      </button>
    </Form>
  );
}
