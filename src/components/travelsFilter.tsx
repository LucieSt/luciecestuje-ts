import "./../styles/travelsFilter.sass";

interface TravelsFilterProps {
  onSelectionChange: (selectedYear: number | null) => void;
  years: number[];
  selectedYear: number | null;
}

const TravelsFilter: React.FC<TravelsFilterProps> = ({ onSelectionChange, years, selectedYear }) => {

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionChange(Number(e.target.value))
  };

  return (
    <div className="travels-filter-wrapper">
      <p>FILTROVAT PODLE LET</p>
      <select onChange={handleYearChange} value={selectedYear || ''}>
      <option value="">Zobrazit vše</option> {/* Placeholder option */}
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default TravelsFilter;
