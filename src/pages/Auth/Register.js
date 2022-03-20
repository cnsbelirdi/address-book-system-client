import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Register = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    const result = await axios.post('api/auth/login', { username, password });

    if (result.data) {
      if (result.data.status === "OK") {
        setAuth({
          username: result.data.username,
          role: result.data.role
        });
        localStorage.setItem('jwt', result.data.jwt);

        setMessage('Successful!');

        return;
      }

      setMessage(result.data.message);

      return;
    }
    else setMessage('An server related error occured!');

    console.log(result);
  }

  function handleInput(e) {
    const value = e.target.value;

    switch (e.target.name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input placeholder="Username" type="text" name="username" onInput={handleInput} />
        <input placeholder="Password" type="password" name="password" onInput={handleInput} />
        <button type="submit">Login</button>
      </form>

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
            <select class="form-control" name="department" id="department">
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
            <select class="form-control" name="department" id="position">
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
            <label for="phoneNumber">Phone Number</label>
            <input type="phoneNumber" class="form-control" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" />
          </div>
          <div class="form-group col-md-6">
            <label for="officeNo">Office Number</label>
            <input type="number" class="form-control" name="officeNo" id="officeNo" placeholder="Enter office number" />
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

      {message != '' && <p>{message}</p>}
    </div>
  );
}
export default Register;