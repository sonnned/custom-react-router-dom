import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Router } from "./Router";
import { Route } from "./Route";
import { Link } from "./Link";
import { getCurrentPath } from "./utils.js";

vi.mock("./utils.js", () => ({
  getCurrentPath: vi.fn(),
}));

describe("Router", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should work", () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it("should render 404 if no route is matched", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />);
    expect(screen.getByText("404")).toBeTruthy();
  });

  it("should render the component of the first route that matches the current path", () => {
    getCurrentPath.mockReturnValue("/about");
    render(
      <Router
        routes={[
          { path: "/", Component: () => <h1>Home</h1> },
          { path: "/about", Component: () => <h1>About</h1> },
        ]}
      />
    );
    expect(screen.getByText("About")).toBeTruthy();
  });

  it("should navigate using links", async () => {
    getCurrentPath.mockReturnValueOnce("/");

    render(
      <Router>
        <Route
          path="/"
          Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to="/about">Go About</Link>
              </>
            );
          }}
        />
        <Route path="/about" Component={() => <h1>About</h1>} />
      </Router>
    );

    //click on the link
    const button = screen.getByText(/Go About/);
    fireEvent.click(button);

    const titleAbout = await screen.findByText("About");

    //check that the new route is rendered
    expect(titleAbout).toBeTruthy();
  });
});
