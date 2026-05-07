import { Search } from "lucide-react";
import { useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: (query: string) => void;
  className?: string;
};

export function SearchBar({
  placeholder = "Search tours, destinations...",
  value,
  onChange,
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const currentQuery = value ?? query;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setQuery(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(currentQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={currentQuery}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-full border border-charcoal/20 bg-white px-6 py-4 pr-12 text-charcoal placeholder:text-charcoal/50 focus:border-savannah focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-savannah/40"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-forest p-2 text-ivory hover:bg-olive transition-colors"
      >
        <Search size={18} />
      </button>
    </form>
  );
}