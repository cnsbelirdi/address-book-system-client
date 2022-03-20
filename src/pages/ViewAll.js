const ViewAll = props => {
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
                <td><button class="btn btn-info my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#viewModal">View</button></td>
                <td><button class="btn btn-danger my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#deleteModal">Delete</button></td>
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

      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Deleting user</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure to delete the user?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success">YES</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade bd-example-modal-lg" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">

          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="viewModalLabel">Time Table</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              {/* <!-- TIME TABLE--> */}

              <div class="table-responsive">
                <table class="table table-bordered text-center">

                  {/* <!-- COLS --> */}
                  <thead>
                    <tr class="bg-light-gray">
                      <th class="text-uppercase">Time
                      </th>
                      <th class="text-uppercase">Monday</th>
                      <th class="text-uppercase">Tuesday</th>
                      <th class="text-uppercase">Wednesday</th>
                      <th class="text-uppercase">Thursday</th>
                      <th class="text-uppercase">Friday</th>
                      <th class="text-uppercase">Saturday</th>
                    </tr>
                  </thead>

                  {/* <!-- ROWS--> */}
                  <tbody>
                    <tr>
                      <td class="align-middle">09:00am</td>
                      <td>
                        <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">SE302</span>
                        <div class="margin-10px-top font-size14">A BLOCK THIRD FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">MATH302</span>
                        <div class="margin-10px-top font-size14">ONLINE</div>
                      </td>
                      <td>
                        <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">ESP124</span>
                        <div class="margin-10px-top font-size14">ONLINE</div>
                      </td>
                      <td>
                        <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">MATH204</span>
                        <div class="margin-10px-top font-size14">B BLOCK THIRD FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">COME202</span>
                        <div class="margin-10px-top font-size14">C BLOCK -1 FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">SE204</span>
                        <div class="margin-10px-top font-size14">A BLOCK THIRD FLOOR</div>
                      </td>
                    </tr>

                    <tr>
                      <td class="align-middle">10:00am</td>
                      <td>
                        <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">COME202</span>
                        <div class="margin-10px-top font-size14">C BLOCK -1 FLOOR</div>
                      </td>
                      <td class="bg-light-gray"></td>
                      <td>
                        <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">SE204</span>
                        <div class="margin-10px-top font-size14">A BLOCK THIRD FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">MATH204</span>
                        <div class="margin-10px-top font-size14">B BLOCK THIRD FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13">SE302</span>
                        <div class="margin-10px-top font-size14">A BLOCK THIRD FLOOR</div>
                      </td>
                      <td class="bg-light-gray"></td>
                    </tr>

                    <tr>
                      <td class="align-middle">11:00am</td>
                      <td class="bg-light-gray"></td>
                      <td class="bg-light-gray"></td>
                      <td class="bg-light-gray"></td>
                      <td class="bg-light-gray"></td>
                      <td class="bg-light-gray"></td>
                      <td class="bg-light-gray"></td>
                    </tr>

                    <tr>
                      <td class="align-middle">12:00pm</td>
                      <td class="bg-light-gray"></td>
                      <td>
                        <span class="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">MATH204</span>
                        <div class="margin-10px-top font-size14">B BLOCK THIRD FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">MATH302</span>
                        <div class="margin-10px-top font-size14">ONLINE</div>
                      </td>
                      <td>
                        <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">SE204</span>
                        <div class="margin-10px-top font-size14">A BLOCK THIRD FLOOR</div>
                      </td>
                      <td class="bg-light-gray"></td>
                      <td>
                        <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">ESP124</span>
                        <div class="margin-10px-top font-size14">ONLINE</div>
                      </td>
                    </tr>

                    <tr>
                      <td class="align-middle">01:00pm</td>
                      <td>
                        <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">SE204</span>
                        <div class="margin-10px-top font-size14">A BLOCK THIRD FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">ESP124</span>
                        <div class="margin-10px-top font-size14">ONLINE</div>
                      </td>
                      <td class="bg-light-gray"></td>
                      <td>
                        <span class="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">COME202</span>
                        <div class="margin-10px-top font-size14">C BLOCK -1 FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">SE204</span>
                        <div class="margin-10px-top font-size14">A BLOCK THIRD FLOOR</div>
                      </td>
                      <td>
                        <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">MATH302</span>
                        <div class="margin-10px-top font-size14">ONLINE</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewAll;