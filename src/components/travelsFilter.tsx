import "./../styles/travelsFilter.sass";

interface TravelsFilterProps {
  onSelectionChange: (selectedYear: number | null) => void;
  years: number[];
  selectedYear: number | null;
}

const TravelsFilter: React.FC<TravelsFilterProps> = ({ onSelectionChange, years, selectedYear }) => {

  // const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   onSelectionChange(Number(e.target.value))
  // };

  const handleYearChange = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.textContent === 'Zobrazit vše') {
      onSelectionChange(null);
    } else {
      const year = Number(e.currentTarget.getAttribute('data-year'));
      onSelectionChange(year);
      console.log(selectedYear, year)
    }
  }

  return (
    <div className="travels-filter-wrapper">
      {/* <p>FILTROVAT PODLE LET</p>
      <select onChange={handleYearChange} value={selectedYear || ''}>
      <option value="">Zobrazit vše</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select> */}

      <div>
        <ul>

          <li
            onClick={handleYearChange}
            className={!selectedYear ? 'year-active' : ''}
          >
            ZOBRAZIT VŠE
          </li>

          {years.map(year => (
            <li
              onClick={handleYearChange}
              key={year}
              data-year={year}
              className={selectedYear === year ? 'year-active' : ''}
            >
              {year}
            </li>
          ))}

        </ul>
      </div>

    </div>
  );
};

export default TravelsFilter;
