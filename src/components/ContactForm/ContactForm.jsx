// import PropTypes from 'prop-types';
import shortid from 'shortid';
import { useState } from 'react';
import { Spinner } from '../Spinner/Spinner';
// import { connect } from 'react-redux';
// import { addContact } from '../../redux/contacts/contacts-actions';
import { Form } from './ContactForm.styled';
import { useAddContactMutation } from '../../services/contactsApi';

export default function ContactForm() {
  const [addContact, { isLoading }] = useAddContactMutation();
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
  const handleSubmit = event => {
    event.preventDefault();
    addContact({ name, phone });
    // onSubmit({ name, number });
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
// ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };
// const mapDispatchToProps = dispatch => ({
//   onSubmit: value => dispatch(addContact(value)),
// });
// export default connect(null, mapDispatchToProps)(ContactForm);
