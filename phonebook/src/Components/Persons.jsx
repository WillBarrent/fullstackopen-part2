const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={deletePerson(person.id)} type="submit">
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
