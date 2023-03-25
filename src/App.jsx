//import lazy to load the components just when they are needed
import { lazy, Suspense } from "react";
import { Router } from "./Router";
import { Route } from "./Route";
const HomePage = lazy(() => import("./pages/Home"));
const SearchPage = lazy(() => import("./pages/Search"));
const AboutPage = lazy(() => import("./pages/About"));
const Page404 = lazy(() => import("./pages/404"));
const User = lazy(() => import("./pages/User"));
import "./App.css";

//extract the routes
const routes = [
  {
    path: "/:lang/about",
    Component: AboutPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path="/" Component={HomePage} />
          <Route path="/user" Component={User} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
