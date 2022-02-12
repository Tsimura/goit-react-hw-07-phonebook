import { useSelector, useDispatch } from 'react-redux';
import { FilterWrapper } from './Filter.styled.jsx';
import { changeFilter } from '../../redux/contacts/contacts-actions';
export default function Filter() {
  const valueFilter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const onChangeFilter = event => dispatch(changeFilter(event.target.value));
  return (
    <FilterWrapper>
      Find contacts by name
      <input type="text" value={valueFilter} onChange={onChangeFilter} />
    </FilterWrapper>
  );
}
