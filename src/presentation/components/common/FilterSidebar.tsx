import { Filter, X } from "lucide-react";
import { useState } from "react";

type FilterOption = {
  label: string;
  value: string;
  count?: number;
};

type FilterSection = {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
};

type FilterSidebarProps = {
  sections: FilterSection[];
  onClearAll: () => void;
  className?: string;
};

export function FilterSidebar({ sections, onClearAll, className }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (sectionIndex: number, value: string) => {
    const section = sections[sectionIndex];
    const isSelected = section.selected.includes(value);
    const newSelected = isSelected
      ? section.selected.filter((v) => v !== value)
      : [...section.selected, value];
    section.onChange(newSelected);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-charcoal/20 bg-white px-4 py-2 text-sm font-semibold text-charcoal lg:hidden"
      >
        <Filter size={16} />
        Filters
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block ${className}`}
      >
        <div className="rounded-premium bg-white p-6 shadow-premium">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-charcoal">
              Filters
            </h2>
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-sm text-forest hover:text-olive"
            >
              <X size={16} />
              Clear All
            </button>
          </div>

          <div className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <div key={section.title}>
                <h3 className="mb-3 font-semibold text-charcoal">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={section.selected.includes(option.value)}
                        onChange={() => handleOptionChange(sectionIndex, option.value)}
                        className="rounded border-charcoal/20 text-forest focus:ring-savannah"
                      />
                      <span className="text-charcoal/70">
                        {option.label}
                        {option.count && (
                          <span className="ml-1 text-charcoal/50">
                            ({option.count})
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}