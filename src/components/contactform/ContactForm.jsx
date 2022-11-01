import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.currentTarget; 

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  }
 
  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit({ name, number })
    recet();
  }

  const recet = () => {
    setName('')
    setNumber('')
  }
  
  return (
      <div>
        <form className={css.formContainer} onSubmit={handleSubmitForm}>
          <label htmlFor="" className={css.label}>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="" className={css.label}>
            Number
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={handleChange}
            />
          </label>
          <button type="Submit" className={css.inputButton}>
            Add contact
          </button>
        </form>
      </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};