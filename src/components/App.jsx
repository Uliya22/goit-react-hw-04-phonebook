import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './contactform/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const [contacts, setContacts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('contacts')) ?? initialContacts;
    } catch (error) {
      console.log(error.name);
    }
  });

  const [filter, setFilter] = useState('');

  const formSubmitHendler = data => {
    const contact = {
      id: nanoid(),
      ...data,
    };

    if (
      contacts.find(
        item => item.name.toLowerCase() === contact.name.toLowerCase()
      )
    )
      alert(`"${contact.name}" is already in contacts.`);
    else {
      setContacts(prevState => [...prevState, contact]);
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHendler} />
      {contacts.length > 0 && (
        <div>
          <h2 className={css.listTitle}>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={getVisibleContacts()}
            onDeleteContact={deleteContact}
            id={contacts.id}
          />
        </div>
      )}
    </div>
  );
};
