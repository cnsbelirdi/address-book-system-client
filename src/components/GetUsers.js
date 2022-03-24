import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as _ from 'lodash';

const GetUsers = ({ isSearch = false, type = "department", searchText = "", params = { page: 1, sort: "name" } }, props) => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [pageCount, setPageCount] = useState();
  let [routeParams, setRouteParams] = useState(params);

  useEffect(async () => {
    getUsers();

    let pageRes;

    await axios.get('api/book_user/size')
      .then(res => pageRes = res)
      .catch(e => console.log(e));

    if (pageRes.status == 200) {
      const count = Math.ceil(pageRes.data.message / 5); // Each page has 5 elements
      setPageCount(count);
    }
  }, [routeParams]);


  let count = 1 + (5 * ((routeParams.page ?? 1) - 1));

  async function deleteUser(username) {
    let res;

    await axios.delete('api/book_user/' + username)
      .then(x => res = x).catch(c => console.log(c));

    if (res.status == 200) {
      window.location.href = '/viewAll';
    }
  }

  async function getUsers() {

    let p = routeParams.page ? routeParams.page - 1 : 0;
    let s = routeParams.sort ? routeParams.sort : "name";

    let url = `api/book_user?page=${p}&sort=${s}`;


    if (isSearch) {
      url = `api/search/${type}/${searchText}`;
    }



    let response;
    await axios.get(url)
      .then(res => response = res)
      .catch(e => console.log(e));

    if (response.status == 200) {
      setUsers(response.data);
    }
  }

  return (
    <div>
      <div className="card bg-light mt-2 mb-2">
        <div className="card-body">
          <h5 className="card-title">All Users</h5>
          {/* <!-- TABLE --> */}
          <table className="table table-hover">
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
                    <td><button className="btn btn-info-light my-sm-0" id="viewButton" onClick={() => navigate("/user/" + user.username)}>View</button></td>
                    <td>
                      <button className="btn btn-primary my-sm-0" type="button" id="editButton" hidden={auth.role != "ROLE_HUMAN RESOURCES"} onClick={() => navigate('/user/edit/' + user.username)}>Update</button>
                    </td>
                    <td>
                      <button className="btn btn-danger my-sm-0" type="button" id="deleteButton" hidden={auth.role != "ROLE_HUMAN RESOURCES"} onClick={() => deleteUser(user.username)}>Delete</button>
                    </td>
                  </tr>);
                })
              }
            </tbody>
          </table>
          {/* <!-- PAGINATION --> */}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className={`page-item ${routeParams.page > 1 ? "" : "disabled"}`}>
                <a className="page-link" onClick={(e) => {
                  navigate(`/viewAll/${routeParams.page - 1}/${routeParams.sort ?? "name"}`);
                  setRouteParams({
                    page: routeParams.page - 1,
                    sort: routeParams.sort
                  });
                }}>Previous</a>
              </li>
              {
                _.range(1, pageCount + 1, 1).map(p => {
                  return <li className="page-item">
                    <a className="page-link" onClick={(e) => {
                      navigate(`/viewAll/${p}/${routeParams.sort ?? "name"}`);
                      setRouteParams({
                        page: p,
                        sort: routeParams.sort
                      });
                    }}>{p}</a>
                  </li>
                })
              }

              <li className={`page-item ${routeParams.page < pageCount ? "" : "disabled"}`}>
                <a className="page-link" onClick={(e) => {
                  navigate(`/viewAll/${routeParams.page + 1}/${routeParams.sort ?? "name"}`);
                  setRouteParams({
                    page: routeParams.page + 1,
                    sort: routeParams.sort
                  });
                }}>Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default GetUsers;