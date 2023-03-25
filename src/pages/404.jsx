import { Link } from "../Link";

export default function Page404() {
  return (
    <>
      <div>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Go back to home</Link>
      </div>
    </>
  );
}
