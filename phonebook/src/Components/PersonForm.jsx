const PersonForm = ({
  name,
  onNameChange,
  number,
  onNumberChange,
  addName,
}) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number:
        <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button onClick={addName} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
