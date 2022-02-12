import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ContactListItem from '../ContactListItem';
import { ContactListWrapper } from './ContactList.styled';
import { useFetchContactsQuery } from '../../services/contactsApi';

export default function ContactList() {
  const filterValue = useSelector(state => state.filter);
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const emptyPhonebook = contacts?.length === 0 && !isFetching;

  return (
    <ContactListWrapper>
      {contacts &&
        !isFetching &&
        contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map(contact => <ContactListItem key={contact.id} {...contact} />)}

      {isFetching && <p>Loading...</p>}
      {emptyPhonebook && <p>You don't have contacts yet...</p>}
    </ContactListWrapper>
  );
}
ContactList.protoTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
