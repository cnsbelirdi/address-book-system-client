const Add = props => {
  return (
    <div class="card bg-light mt-2 mb-2">
      <div class="card-body">
        <h5 class="card-title">Add User</h5>
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name">Name & Surname</label>
              <input type="text" class="form-control" id="name" placeholder="Enter name & surname" />
            </div>
            <div class="form-group col-md-6">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" placeholder="Email" />
            </div>
            <div class="form-group col-md-6">
              <label for="role">Role</label>
              <input type="role" class="form-control" id="role" placeholder="Role" />
            </div>
          </div>


          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="department">Department</label>
              <select class="form-control" id="department">
                <option>Choose..</option>
                <option>Department1</option>
                <option>Department2</option>
                <option>Department3</option>
                <option>Department4</option>
                <option>Department5</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="position">Position</label>
              <select class="form-control" id="position">
                <option>Choose..</option>
                <option>Position1</option>
                <option>Position2</option>
                <option>Position3</option>
                <option>Position4</option>
                <option>Position5</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="phone">Phone Number</label>
              <input type="phone" class="form-control" id="phone" placeholder="Enter phone number" />
            </div>
            <div class="form-group col-md-6">
              <label for="office">Office Number</label>
              <input type="number" class="form-control" id="office" placeholder="Enter office number" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="courses">Courses</label>
              <select class="form-control" id="courses">
                <option>Choose..</option>
                <option>Software Project Management</option>
                <option>Object Oriented Programming II</option>
                <option>Software Construction</option>
                <option>Spanish II</option>
                <option>Numerical Analysis</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="time">Course Time</label>
              <select class="form-control" id="time">
                <option>09:00 - 10:00</option>
                <option>10:00 - 11:00</option>
                <option>11:00 - 12:00</option>
                <option>12:00 - 13:00</option>
                <option>13:00 - 14:00</option>
                <option>14:00 - 15:00</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <button class="mt-4_5 btn btn-primary" id="addCourse" type="button">&#10010;</button>
            </div>
          </div>

          <label for="list">Added Courses</label>
          <div class="card" style={{ minHeight: "60px" }}>
            <ul class="list-group" id="list">

            </ul>
          </div>
          <button type="submit" class="btn btn-primary mt-3">ADD USER</button>
        </form>
      </div>
    </div>
  );
}
export default Add;