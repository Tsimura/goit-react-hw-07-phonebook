import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactListItem from '../ContactListItem';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import { ContactListWrapper } from './ContactList.styled';
import { useFetchContactsQuery } from '../../services/contactsApi';
export const ContactList = () => {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const emptyPhonebook = contacts?.length === 0 && !isFetching;
  return (
    <ContactListWrapper>
      {contacts &&
        contacts.map(contact => (
          <ContactListItem key={contact.id} {...contact} />
        ))}
      {isFetching && <p>Loading...</p>}
      {emptyPhonebook && <p>You don't have contacts yet...</p>}
      {/* ======================================== */}
      {/* {contacts.length > 0 ? (
        contacts.map(({ id, name, number }) => (
          <li key={id}>
            <ContactListItem
              id={id}
              name={name}
              number={number}
              onDelete={onDeleteContact}
            />
          </li>
        ))
      ) : (
        <p>You don't have contacts yet...</p>
      )} */}
      {/* ======================================== */}
    </ContactListWrapper>
  );
};
ContactList.protoTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};
const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisibleContacts(items, filter),
});
const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(deleteContact(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

// filter((contact) =>
//     name.toLowerCase().includes(filter.toLowerCase())
