import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ContactListItem from '../ContactListItem';
import FadingLoader from '../Loader/Loader';
import { useFetchContactsQuery } from '../../services/contactsApi';
import { ContactListWrapper } from './ContactList.styled';
export default function ContactList() {
  const normalizedFilter = useSelector(state => state.filter).toLowerCase();
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const emptyPhonebook = contacts?.length === 0 && !isFetching;
  return (
    <ContactListWrapper>
      {contacts &&
        !isFetching &&
        contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
          )
          .map(contact => <ContactListItem key={contact.id} {...contact} />)}
      {isFetching && <FadingLoader />}
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
