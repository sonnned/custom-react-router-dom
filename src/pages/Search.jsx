import { useEffect } from "react";
import { Link } from "../Link";

export default function SearchPage({ routeParams }) {
  useEffect(() => {
    document.title = `Searching ${routeParams.query}...`;
  }, []);

  return (
    <>
      <h1>Searching {routeParams.query}...</h1>
      <p>Search results will be displayed here</p>
      <Link to="/">Go back to home</Link>
    </>
  );
}
