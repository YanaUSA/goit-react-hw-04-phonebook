import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { nanoid } from 'nanoid';
import { Container, Title, ContactsTitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const { contacts } = this.state;
    try {
      const contactUserList =
        JSON.parse(localStorage.getItem('contacts')) ?? contacts;

      this.setState({ contacts: contactUserList });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = obj => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      ...obj,
    };

    contacts.find(({ name }) => name.toLowerCase() === obj.name.toLowerCase())
      ? alert(`${obj.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  filterContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilterValue = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilterValue)
    );
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactForm addContact={this.addContact} contacts={contacts} />

        <ContactsTitle>Contacts</ContactsTitle>

        <Filter filterValue={filter} onChange={this.filterContact} />

        <ContactList
          contacts={this.getFilteredContact()}
          deleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
