import React, { useEffect, useState } from "react";
import phonebookServices from "./services/Phonebook";

const Notification = ({ message, notificationClass }) => {
  if (message === null) {
    return null;
  }
  return <div className={notificationClass}>{message}</div>;
};

const FilterSearch = ({ filterString, setFilterString }) => (
  <>
    <h2>Find contact</h2>
    Filter shown contacts with
    <input
      value={filterString}
      onChange={(event) => setFilterString(event.target.value)}
    />
  </>
);

const AddNewContact = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  onAddClick,
}) => (
  <>
    <h2>Add new</h2>
    <form>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={onAddClick}>
          add
        </button>
      </div>
    </form>
  </>
);

const PhoneBookPerson = ({ person, onDeleteClick }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button onClick={() => onDeleteClick(person)}>Delete</button>
    </td>
  </tr>
);

const PhoneBookTable = ({ persons, onDeleteClick }) => (
  <>
    <h2>Numbers</h2>
    <table>
      <thead></thead>
      <tbody>
        {persons.map((person) => (
          <PhoneBookPerson
            key={person.name}
            person={person}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </tbody>
    </table>
  </>
);

const SendNotification = (setterFunction, notificiaton) => {
  setterFunction(notificiaton);
  setTimeout(() => {
    setterFunction(null);
  }, 5000);
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const databaseHook = () => {
    phonebookServices.getAll().then((personsData) => setPersons(personsData));
  };
  useEffect(databaseHook, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const shownContacts = persons.filter((person) =>
    person.name.match(filterString)
  );

  const onAddClick = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    let matchingPerson = persons.find((person) => person.name === newName);
    if (matchingPerson) {
      if (
        window.confirm(
          `${newName} already exists in the phonebook. Do you wish to update the number?`
        )
      ) {
        newPerson.id = matchingPerson.id;
        phonebookServices
          .update(newPerson)
          .then((addedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === addedPerson.id ? addedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            SendNotification(setSuccessMessage, "Updated " + addedPerson.name);
          })
          .catch((error) => {
            SendNotification(
              setErrorMessage,
              "Information of " + newPerson.name + " could not be accessed"
            );
          });
      }
    } else {
      phonebookServices.create(newPerson).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewName("");
        setNewNumber("");
        SendNotification(setSuccessMessage, "Added " + addedPerson.name);
      });
    }
  };

  const onDeleteClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`).valueOf()) {
      phonebookServices
        .deletePerson(person)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          SendNotification(setSuccessMessage, "Deleted " + person.name);
        })
        .catch((error) => {
          SendNotification(
            setErrorMessage,
            "Information of " + person.name + " could not be accessed"
          );
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} notificationClass="error" />
      <Notification message={successMessage} notificationClass="success" />
      <FilterSearch
        filterString={filterString}
        setFilterString={setFilterString}
      />
      <AddNewContact
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onAddClick={onAddClick}
      />
      <PhoneBookTable persons={shownContacts} onDeleteClick={onDeleteClick} />
    </div>
  );
};

export default App;
