const Filter = ({ value, onChange }) => {
  return (
    <form>
      <div>
        filter shown with a: <input value={value} onChange={onChange} />
      </div>
    </form>
  );
};

export default Filter;
