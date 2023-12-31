import { React } from "../../deps.ts";

type HomeProps = {
  name: string;
};

export function Home({ name }: HomeProps) {
  return (
    <>
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Welcome, {name}
            </h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <a
                href="/workorders"
                hx-boost="true"
                hx-target="main"
                className="tile is-child notification is-light"
              >
                <p className="title">Work Orders</p>
                <p className="subtitle">Get a handle on WIP</p>
              </a>
            </div>
            <div className="tile is-parent">
              <a
                href="/users"
                hx-boost="true"
                hx-target="main"
                className="tile is-child notification is-light"
              >
                <p className="title">User Management</p>
                <p className="subtitle">Add or suspend user accounts</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
