import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ContactListItem from '../ContactListItem';
import FadingLoader from '../Loader/Loader';
import { useFetchContactsQuery } from '../../services/contactsApi';
import { ContactListWrapper } from './ContactList.styled';
export default function ContactList() {
  const filter = useSelector(state => state.filter);
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const getVisibleContacts = (contacts, filter) => {
    const normalizedFilterCont = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilterCont)
    );
  };
  const emptyPhonebook = contacts?.length === 0 && !isFetching;
  const makeContactsList = contacts && !isFetching;
  return (
    <ContactListWrapper>
      {makeContactsList &&
        getVisibleContacts(contacts, filter).map(contact => (
          <ContactListItem key={contact.id} {...contact} />
        ))}
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
