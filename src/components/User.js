import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const EDIT_URL = {
  url: "api/book_user/",
  type: "edit"
};
export const ADD_URL = {
  url: "api/book_user",
  type: "add"
};
export const REGISTER_URL = {
  url: "api/auth/register",
  type: "register"
};

export const VIEW_URL = {
  url: "api/book_user/",
  type: "view"
}

const User = ({ editMode = true, includeUserDetails = false, url = REGISTER_URL, title = "Register" }) => {
  const [timeTable, setTimeTable] = useState([]);
  const [course, setCourse] = useState('');
  const [day, setDay] = useState(0);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const { username } = useParams();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      "name": "",
      "username": "",
      "password": "",
      "role": "Student",
      "department": "",
      "position": "",
      "phoneNumber": 0,
      "email": "",
      "officeNo": "",
      "timeTable": []
    },
    onSubmit: async event => {
      // event.preventDefault();
      console.log(event);
      if (editMode) {
        if (url.type == ADD_URL.type || url.type == REGISTER_URL.type) {
          let result;

          await axios.post(url.url, formik.values)
            .then(res => result = res)
            .catch(e => console.log(e));

          if (result.status == 200) {
            localStorage.setItem('jwt', "Bearer " + result.data.jwt);
            navigate('/');
          }
        }
        else {
          let result;

          await axios.patch(url.url + username, formik.values)
            .then(res => result = res)
            .catch(e => console.log(e));

          console.log(result)
        }
      }
    }
  });

  // Get user infos for update and view in beginning
  useEffect(async () => {
    if (url.type == VIEW_URL.type || url.type == EDIT_URL.type) {
      if (username) {
        let response;
        await axios.get(url.url + username).then(res => response = res).catch(e => console.log(e));
        if (response.status === 200) {
          formik.setValues(response.data);

          let table = [];

          for (let i = 0; i < response.data.timeTable.length; i++) {
            table.push({ id: i, ...response.data.timeTable[i] });
          }

          setTimeTable(table);
        }
      }
    }
  }, [])


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
        <h5 class="card-title">{title ?? "Register"}</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name & Surname</label>
              <input type="text" className="form-control" disabled={!editMode}
                onChange={formik.handleChange} value={formik.values.name}
                id="name" placeholder="Enter name & surname" />
            </div>
            <div className="form-group col-md-6" hidden={!includeUserDetails}>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" disabled={!editMode}
                onChange={formik.handleChange} value={formik.values.username}
                id="username" placeholder="Username" />
            </div>
            <div className="form-group col-md-6" hidden={!includeUserDetails}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" disabled={!editMode}
                onChange={formik.handleChange} value={formik.values.password}
                id="password" placeholder="Password" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" disabled={!editMode}
                onChange={formik.handleChange} value={formik.values.email}
                id="email" placeholder="Email" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="role">Role</label>
              <select className="form-control" disabled={!editMode}
                value={formik.values.role}
                name="role" id="role" onChange={formik.handleChange}>
                <option disabled defaultChecked>Choose..</option>
                <option>Student</option>
                <option>Employee</option>
                <option>Human Resources</option>
              </select>
            </div>
          </div>


          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="department">Department</label>
              <select className="form-control" name="department" disabled={!editMode}
                value={formik.values.department}
                id="department" onChange={formik.handleChange}>
                <option disabled defaultValue>Choose..</option>
                <option >Department1</option>
                <option>Department2</option>
                <option>Department3</option>
                <option>Department4</option>
                <option>Department5</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="position">Position</label>
              <select className="form-control" name="position" disabled={!editMode}
                value={formik.values.position}
                id="position" onChange={formik.handleChange}>
                <option disabled >Choose..</option>
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
              <input type="phoneNumber" className="form-control" disabled={!editMode}
                onChange={formik.handleChange} value={formik.values.phoneNumber}
                name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="officeNo">Office Number</label>
              <input type="number" className="form-control" disabled={!editMode}
                onChange={formik.handleChange} value={formik.values.officeNo}
                name="officeNo" id="officeNo" placeholder="Enter office number" />
            </div>
          </div>

          {/* Time Tables */}
          <div className="timetable" hidden={!editMode}>
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
          <button type="submit" hidden={!editMode} className="btn btn-primary mt-3">ADD USER</button>
        </form>

        {message != '' && <p>{message}</p>}
      </div>
    </div>
  );
}
export default User;