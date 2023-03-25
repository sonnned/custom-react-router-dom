import { useState } from "react";
import { Link, navigate } from "../Link";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    //navigate to the search page
    navigate(`/search/${search}`);
  };

  return (
    <>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum illum
        eum illo amet perferendis, commodi quaerat porro sit sequi optio nam
        consequuntur quidem inventore modi voluptatibus praesentium. Adipisci,
        placeat consectetur.
      </p>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div>
        <Link to="/about">About</Link>
      </div>
      <div>
        <Link to="/user">User</Link>
      </div>
    </>
  );
}
