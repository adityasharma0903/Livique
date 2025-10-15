const FilterBar = () => {
  return (
    <div className="bg-background border-y py-3 px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select className="px-3 py-1.5 border rounded-md text-xs bg-background">
            <option>Headphone Type</option>
          </select>
          <select className="px-3 py-1.5 border rounded-md text-xs bg-background">
            <option>Price</option>
          </select>
          <select className="px-3 py-1.5 border rounded-md text-xs bg-background">
            <option>Review</option>
          </select>
          <select className="px-3 py-1.5 border rounded-md text-xs bg-background">
            <option>Color</option>
          </select>
          <select className="px-3 py-1.5 border rounded-md text-xs bg-background">
            <option>Material</option>
          </select>
          <select className="px-3 py-1.5 border rounded-md text-xs bg-background">
            <option>Offer</option>
          </select>
          <button className="px-3 py-1.5 border rounded-md text-xs flex items-center gap-1 bg-background">
            All Filters
          </button>
        </div>
        <select className="px-3 py-1.5 border rounded-md text-xs bg-background">
          <option>Sort by</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
