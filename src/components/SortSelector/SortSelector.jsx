import "./SortSelector.css";

const SortSelector = ({ value, setValue }) => {
  return (
    <select
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className="select"
    >
      <option value="">Сортувати за</option>
      <option value="popular">За популярністю</option>
      <option value="date">За датою</option>
    </select>
  );
};

export default SortSelector;
