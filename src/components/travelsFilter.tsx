import "./../styles/travelsFilter.sass";

interface TravelsFilterProps {
  onYearSelectionChange: (selectedYear: number | null) => void;
  onCountrySelectionChange: (selectedCountry: string | null) => void;
  years: number[];
  selectedYear: number | null;
  countries: string[];
  selectedCountry: string | null;
}

const TravelsFilter: React.FC<TravelsFilterProps> = ({ onYearSelectionChange, onCountrySelectionChange, years, selectedYear, countries, selectedCountry }) => {

  const handleYearChange = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.textContent === 'vše') {
      onYearSelectionChange(null);
    } else {
      const year = Number(e.currentTarget.getAttribute('data-year'));
      onYearSelectionChange(year);
    }
  }

  const handleCountryChange = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.textContent === 'vše') {
      onCountrySelectionChange(null);
    } else {
      const country = e.currentTarget.getAttribute('data-country');
      onCountrySelectionChange(country);
    }
  }

  return (
    <div className="travels-filter-wrapper">

      {/* FILTR YEARS */}
      <div>
        <ul>
          <li
            onClick={handleYearChange}
            className={!selectedYear ? 'selection-active' : ''}
          >
            VŠE
          </li>
          {years.map(year => (
            <li
              onClick={handleYearChange}
              key={year}
              data-year={year}
              className={selectedYear === year ? 'selection-active' : ''}
            >
              {year}
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* FILTR COUNTRIES */}
      <div>
        <ul>
          <li
            onClick={handleCountryChange}
            className={!selectedCountry ? 'selection-active' : ''}
          >
            VŠE
          </li>
          {countries.map(country => (
            <li
              onClick={handleCountryChange}
              key={country}
              data-country={country}
              className={selectedCountry === country ? 'selection-active' : ''}
            >
              {country}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default TravelsFilter;
