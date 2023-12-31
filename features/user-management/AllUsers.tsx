import { React } from "../../deps.ts";
import { User } from "./UserManagementDomain.ts";

export function AllUsers({ users }: AllUsersProps) {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">User Management</h1>
          <button
            className="button is-primary"
            hx-get="/users/create"
            hx-target="main"
            hx-push-url="true"
          >
            Create New User
          </button>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="columns is-multiline">
            {users.map((user) => (
              <div className="column is-one-third">
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title">{user.personalInfo.firstName}</p>
                        <p className="subtitle">
                          {user.personalInfo.communicationEmail}
                        </p>
                      </div>
                    </div>
                    <div className="content">
                      <span
                        className={`tag is-rounded ${
                          getTagColor(user.roles[0])
                        }`}
                      >
                        {user.roles[0]}
                      </span>
                    </div>
                  </div>
                  <footer className="card-footer">
                    <a href="#" className="card-footer-item">Edit</a>
                    <a href="#" className="card-footer-item">Delete</a>
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function getTagColor(role: string) {
  switch (role) {
    case "Admin":
      return "is-danger";
    case "Crew Leader":
      return "is-success";
    default:
      return "is-info";
  }
}

type AllUsersProps = {
  users: User[];
};
