const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
