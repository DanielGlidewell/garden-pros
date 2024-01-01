import { React } from "../../deps.ts";

export function CreateUser() {
  return (
    <>
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h2 className="title">Create New User</h2>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="section">
          <div className="container is-max-desktop">
            <form action="/users/create" method="POST">
              <div className="columns">
                <div className="field column">
                  <label className="label">Role</label>
                  <div className="control">
                    <div className="select">
                      <select name="role">
                        <option value="Crew Leader" selected>
                          Crew Leader
                        </option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="field column is-one-third">
                  <label className="label">First Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="personalInfo.firstName"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="field column is-one-third">
                  <label className="label">Last Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="personalInfo.lastName"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="field column is-one-third">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="personalInfo.communicationEmail"
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
              <div className="columns">
                <input
                  type="hidden"
                  name="identification.type"
                  value="password"
                />
                <input
                  type="hidden"
                  name="identification.identifier"
                  value="first_initial_last_name_scheme"
                />
                <div className="field column is-one-half">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="identification.credential"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary">Create User</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
