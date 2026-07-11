import css from "./SearchBox.module.css";

interface SearchBoxProps {
  handleSearch: (query: string) => void;
}

function SearchBox({ handleSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}

export default SearchBox;