import { render, screen } from "@testing-library/react";

jest.mock("react-router-dom", () => {
  const React = require("react");

  return {
    BrowserRouter: ({ children }) => <>{children}</>,
    Routes: ({ children }) => <>{children}</>,
    Route: ({ element }) => element || null,
    NavLink: ({ children, to, className }) => {
      const resolvedClassName =
        typeof className === "function" ? className({ isActive: false }) : className;
      return (
        <a className={resolvedClassName} href={to}>
          {children}
        </a>
      );
    },
    Outlet: () => null,
    useLocation: () => ({ pathname: "/" }),
    useNavigate: () => jest.fn(),
    useParams: () => ({ id: "1" })
  };
}, { virtual: true });

import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: [] })
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders admin workspace shell", () => {
  render(<App />);
  expect(screen.getByText(/Cafe Material/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Tong quan van hanh/i })).toBeInTheDocument();
});


