import "./SortSelector.css";

const SortSelector = ({ value, setValue }) => {
  const arr = [
    {
      sortType: "likes",
      label: "Найбільш вподобані",
    },
    {
      sortType: "comments",
      label: "Найбільш коментовані",
    },
    {
      sortType: "newest",
      label: "найновіші",
    },
    {
      sortType: "oldest",
      label: "найстаріші",
    },
  ];

  const handleClick = (sortType) => {
    if (sortType === value) {
      setValue("");
      return;
    }

    setValue(sortType);
  };

  return (
    <div className="sort-container">
      {arr.map(({ sortType, label }) => {
        const className = sortType === value ? "sort-item active" : "sort-item";

        return (
          <div
            className={className}
            onClick={() => handleClick(sortType)}
            key={sortType}
          >
            <div className="medium-text">{label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SortSelector;
