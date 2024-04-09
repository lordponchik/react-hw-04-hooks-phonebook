import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';

import s from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('name not found');
    }
  };

  const submitForm = evt => {
    evt.preventDefault();

    onSubmit({ name, number });

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={submitForm} className={s.form}>
      <div className={s.inputsWrapper}>
        <label htmlFor={nameInputId} className={s.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id={nameInputId}
          className={s.input}
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={s.inputsWrapper}>
        <label htmlFor={numberInputId} className={s.label}>
          Number
        </label>
        <input
          type="tel"
          name="number"
          id={numberInputId}
          value={number}
          onChange={handleChange}
          placeholder="Enter phone number"
          className={s.input}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" className={s.submit}>
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
