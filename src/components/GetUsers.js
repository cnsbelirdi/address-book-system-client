import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GetUsers = ({ isSearch = false, type = "department", searchText = "" }) => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [url, setUrl] = useState(isSearch ? `api/search/${type}/${searchText}`
    : "api/book_user")

  useEffect(async () => {
    let response;
    await axios.get(url)
      .then(res => response = res)
      .catch(e => console.log(e));

    if (response.status == 200) {
      setUsers(response.data);
    }
  }, []);

  let count = 1;

  async function deleteUser(username) {
    let res;

    await axios.delete('api/book_user/' + username)
      .then(x => res = x).catch(c => console.log(c));

    if (res.status == 200) {
      window.location.href = '/viewAll';
    }
  }

  return (
    <div>
      <div class="card bg-light mt-2 mb-2">
        <div class="card-body">
          <h5 class="card-title">All Users</h5>
          {/* <!-- TABLE --> */}
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Department</th>
                <th scope="col">Position</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Office No</th>
                <th scope="col" colSpan="3"></th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(user => {
                  return (<tr>
                    <th scope="row">{count++}</th>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.department}</td>
                    <td>{user.position}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNo}</td>
                    <td>{user.officeNo}</td>
                    <td><button class="btn btn-info-light my-sm-0" id="viewButton" onClick={() => navigate("/user/" + user.username)}>View</button></td>
                    <td>
                      <button class="btn btn-primary my-sm-0" type="button" id="editButton" hidden={auth.role != "ROLE_HUMAN RESOURCES"} onClick={() => navigate('/user/edit/' + user.username)}>Update</button>
                    </td>
                    <td>
                      <button class="btn btn-danger my-sm-0" type="button" id="deleteButton" hidden={auth.role != "ROLE_HUMAN RESOURCES"} onClick={() => deleteUser(user.username)}>Delete</button>
                    </td>
                  </tr>);
                })
              }
            </tbody>
          </table>
          {/* <!-- PAGINATION --> */}
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Previous</a>
              </li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default GetUsers;