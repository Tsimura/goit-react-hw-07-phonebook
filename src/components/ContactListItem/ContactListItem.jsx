import PropTypes from 'prop-types';
import { ImUserMinus, ImBin } from 'react-icons/im';
import { useDeleteContactMutation } from '../../services/contactsApi';
export default function ContactListItem({ id, name, phone }) {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  return (
    <li>
      {name}: {phone}
      <button
        type="button"
        onClick={() => deleteContact(id)}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <ImBin size={18}></ImBin>
        ) : (
          <ImUserMinus size={18}></ImUserMinus>
        )}
      </button>
    </li>
  );
}
ContactListItem.protoTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
