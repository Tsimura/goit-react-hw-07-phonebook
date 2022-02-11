import PropTypes from 'prop-types';
import { ImUserMinus, ImBin } from 'react-icons/im';
import { useDeleteContactMutation } from '../../services/contactsApi';
const ContactListItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  return (
    <li>
      {name}: {number}
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
};
ContactListItem.protoTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  // onDelete: PropTypes.func.isRequired,
};
export default ContactListItem;
