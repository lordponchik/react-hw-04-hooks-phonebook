import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

function App() {
  const CONTACTS = 'contacts';

  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(CONTACTS)) || []
  );
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (contacts.find(({ name }) => name === contact.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const handleFilter = evt => {
    const { value } = evt.target;

    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name, number }) => {
      return (
        number.split('-').join('').includes(filter) ||
        number.includes(filter) ||
        name.toLowerCase().includes(normalizedFilter)
      );
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addContact}></ContactForm>
      <h2>Contacts</h2>

      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} handleFilter={handleFilter}></Filter>
          <ContactList
            contacts={getVisibleContacts()}
            deleteContact={deleteContact}
          ></ContactList>
        </>
      ) : (
        <Notification message="You don't have any contact"></Notification>
      )}
    </div>
  );
}

export default App;
