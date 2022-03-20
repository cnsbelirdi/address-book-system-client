import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewAll = props => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    let response;
    await axios.get('api/book_user')
      .then(res => response = res)
      .catch(e => console.log(e));

    if (response.status == 200) {
      setUsers(response.data);
    }
  }, []);

  let count = 1;
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
                <th scope="col">Time Table</th>
                <th scope="col"></th>
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
                    <td><button class="btn btn-info my-2 my-sm-0" onClick={() => navigate("/user/" + user.username)}>View</button></td>
                    <td><button class="btn btn-danger my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#deleteModal">Delete</button></td>
                  </tr>);
                })
              }
              {/* SAMPLE ROWS */}
              <div>SAMPLE ROWS</div>
              <tr>
                <th scope="row">1</th>
                <td>Name1</td>
                <td>Department1</td>
                <td>Position1</td>
                <td>email1@mail.com</td>
                <td>5011115151</td>
                <td>123</td>
                <td><button class="btn btn-info my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#viewModal">View</button></td>
                <td><button class="btn btn-danger my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#deleteModal">Delete</button></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Name2</td>
                <td>Department2</td>
                <td>Position2</td>
                <td>email2@mail.com</td>
                <td>5022225252</td>
                <td>234</td>
                <td><button class="btn btn-info my-2 my-sm-0" >View</button></td>
                <td><button class="btn btn-danger my-2 my-sm-0"  >Delete</button></td>
              </tr>
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
export default ViewAll;