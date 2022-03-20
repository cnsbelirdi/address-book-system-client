import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";

const Register = props => {

  const [timeTable, setTimeTable] = useState([]);
  const [course, setCourse] = useState('');
  const [day, setDay] = useState(0);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useAuth();

  const formik = useFormik({
    initialValues: {
      "name": "",
      "username": "",
      "password": "",
      "role": "",
      "department": "",
      "position": "",
      "phoneNumber": 0,
      "email": "",
      "officeNo": "",
      "timeTable": []
    },
    onSubmit: event => {
      // event.preventDefault();
      console.log(event);
    }
  });

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setMessage('');

  //   const result = await axios.post('api/auth/login', { username, password });

  //   if (result.data) {
  //     if (result.data.status === "OK") {
  //       setAuth({
  //         username: result.data.username,
  //         role: result.data.role
  //       });
  //       localStorage.setItem('jwt', result.data.jwt);

  //       setMessage('Successful!');

  //       return;
  //     }

  //     setMessage(result.data.message);

  //     return;
  //   }
  //   else setMessage('An server related error occured!');

  //   console.log(result);
  // }

  function handleCourseSelect(e) {
    let value = e.target.value;

    switch (e.target.name) {
      case "course":
        setCourse(value);
        break;
      case "time":
        setTime(value);
        break;
      case "day":
        setDay(value);
        break;
      default:
        break;
    }
  }


  function addTimeTable() {
    if (day && time && course) {
      let newTime = {
        id: timeTable.length,
        dayOfWeek: day,
        hour: time,
        className: course,
        label: 'SMP-101' // sample
      }
      console.log(newTime);

      setTimeTable([newTime, ...timeTable]);
      console.log(timeTable);
    }
  }

  function removeFromTable(id) {
    setTimeTable(prev => {
      return prev.filter(t => t.id != id);
    });
  }

  return (
    <div class="card bg-light mt-2 mb-2">
      <div class="card-body">
        <h5 class="card-title">{props.title ?? "Register"}</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name & Surname</label>
              <input type="text" className="form-control"
                onChange={formik.handleChange}
                id="name" placeholder="Enter name & surname" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control"
                onChange={formik.handleChange}
                id="username" placeholder="Username" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control"
                onChange={formik.handleChange}
                id="password" placeholder="Password" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control"
                onChange={formik.handleChange}
                id="email" placeholder="Email" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="role">Role</label>
              <select className="form-control" name="role" id="role" onChange={formik.handleChange}>
                <option disabled defaultValue>Choose..</option>
                <option>Student</option>
                <option>Employee</option>
                <option>Human Resources</option>
              </select>
            </div>
          </div>


          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="department">Department</label>
              <select className="form-control" name="department" id="department" onChange={formik.handleChange}>
                <option disabled defaultValue>Choose..</option>
                <option>Department1</option>
                <option>Department2</option>
                <option>Department3</option>
                <option>Department4</option>
                <option>Department5</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="position">Position</label>
              <select className="form-control" name="position" id="position" onChange={formik.handleChange}>
                <option disabled defaultValue>Choose..</option>
                <option>Position1</option>
                <option>Position2</option>
                <option>Position3</option>
                <option>Position4</option>
                <option>Position5</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="phoneNumber" className="form-control"
                onChange={formik.handleChange}
                name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="officeNo">Office Number</label>
              <input type="number" className="form-control"
                onChange={formik.handleChange}
                name="officeNo" id="officeNo" placeholder="Enter office number" />
            </div>
          </div>

          {/* Time Tables */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="courses">Courses</label>
              <select className="form-control" id="courses" name="course" onChange={handleCourseSelect}>
                <option disabled>Choose..</option>
                <option defaultValue>Software Project Management</option>
                <option>Object Oriented Programming II</option>
                <option>Software Construction</option>
                <option>Spanish II</option>
                <option>Numerical Analysis</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="time">Course Time</label>
              <select className="form-control" id="time" name="time" onChange={handleCourseSelect}>
                <option defaultValue>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
                <option>18:00</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="day">Course Time</label>
              <select className="form-control" id="day" name="day" onChange={handleCourseSelect}>
                <option value={0} defaultValue>Monday</option>
                <option value={1}>Tuesday</option>
                <option value={2}>Wednesday</option>
                <option value={3}>Thursday</option>
                <option value={4}>Friday</option>
                <option value={5}>Saturday</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <button className="mt-4_5 btn btn-primary" id="addCourse" type="button" onClick={addTimeTable}>&#10010;</button>
            </div>
          </div>

          <label htmlFor="list">Added Courses</label>
          <div className="card" style={{ minHeight: "60px" }}>
            <ul className="list-group" id="list">

              {
                timeTable.map(t => {
                  return (
                    <li class="py-3 shadow list-group-item" key={t.id}>
                      <div class="row">
                        <div class="col-6">
                          <span class="" > {t.className} </span>
                        </div>
                        <div class="col-5">
                          <span class="" > {t.hour} </span>
                        </div>
                        <div class="col-1">
                          <button class=" btn btn-primary btn-sm" onClick={(e) => removeFromTable(t.id)}>&#10008;</button>
                        </div>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <button type="submit" className="btn btn-primary mt-3">ADD USER</button>
        </form>

        {message != '' && <p>{message}</p>}
      </div>
    </div>
  );
}
export default Register;