import { React } from "../../../deps.ts";

export function Header() {
  return (
    <header>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a hx-boost="true" hx-target="main" className="navbar-item" href="/">
            <img src="/public/favicon-32x32.png" alt="Logo" />
          </a>
          <span className="navbar-item is-size-5">Garden Pros</span>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a
              hx-boost="true"
              hx-target="main"
              className="navbar-item gk-navbar-link"
              href="/"
            >
              Home
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>
              <div className="navbar-dropdown">
                <a
                  hx-boost="true"
                  hx-target="main"
                  className="navbar-item gk-navbar-link"
                  href="/workorders"
                >
                  Work Orders
                </a>
                <a
                  hx-boost="true"
                  hx-target="main"
                  className="navbar-item gk-navbar-link"
                  href="/users"
                >
                  User Management
                </a>
                <hr className="navbar-divider" />
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
