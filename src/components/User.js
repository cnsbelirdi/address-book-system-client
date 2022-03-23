import axios from "axios";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import ValidationLabel from "./ValidationLabel";
import { useAuth } from "../contexts/AuthContext";
import TimeTable from "./timetable/TimeTable";
import ListCourses from "./timetable/ListCourses";

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
  const [auth, setAuth] = useAuth();
  const { username } = useParams();
  const [initialValues, setInitialValues] = useState({
    "name": "",
    "username": "",
    "password": "",
    "role": "Student",
    "department": "Department1",
    "position": "Position1",
    "phoneNumber": 0,
    "email": "",
    "officeNo": "",
    "timeTable": []
  });
  const navigate = useNavigate();
  const [timeTable, setTimeTable] = useState([]);


  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Name is required'),
    username: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username is required'),
    password: Yup.string().min(8, "Too Short!").max(50, "Too Long!").required('Password is required'),
    role: Yup.string().required('Role is required'),
    department: Yup.string().required('Department is required'),
    phoneNumber: Yup.string().min(10, "Invalid phone number!").max(15, "Too Long!").required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });


  // Get user infos for update and view in beginning
  useEffect(async () => {
    if (url.type == VIEW_URL.type || url.type == EDIT_URL.type) {
      if (username) {
        let response;
        await axios.get(url.url + username).then(res => response = res).catch(e => console.log(e));
        if (response.status === 200) {
          setInitialValues(response.data);
          let t = [];
          for (let i = 0; i < response.data.timeTable.length; i++) {
            t.push({
              id: i,
              ...response.data.timeTable[i]
            });
          }
          setTimeTable(t);
        }
      }
    }
  }, [])


  function addToTimeTable(value) {
    setTimeTable(prev => [value, ...prev]);
  }

  function getTimeTableLen() {
    return timeTable.length;
  }

  function removeFromTimeTable(id) {
    setTimeTable(prev => prev.filter(x => x.id != id));
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={UserSchema}
      onSubmit={async values => {
        // event.preventDefault();
        if (editMode) {
          values.timeTable = timeTable;

          if (url.type == ADD_URL.type || url.type == REGISTER_URL.type) {
            let result;

            await axios.post(url.url, values)
              .then(res => result = res)
              .catch(e => console.log(e));

            if (result.status == 200) {
              if (url.type == REGISTER_URL.type) {
                localStorage.setItem('jwt', "Bearer " + result.data.jwt);
                setAuth({
                  username: values.username,
                  role: values.role
                });
                navigate('/');
                return;
              }
            }
          }
          else {
            let result;

            await axios.patch(url.url + username, values)
              .then(res => result = res)
              .catch(e => console.log(e));

            console.log(result)
          }
          navigate('/viewAll');
        }
      }}
    >
      {
        ({ errors, touched, values, handleChange, handleSubmit }) => {
          return (<div class="card bg-light mt-2 mb-2">
            <div class="card-body">
              <h5 class="card-title">{title ?? "Register"}</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <ValidationLabel tag="Name & Surname" message={errors.name} />
                    <input type="text" className="form-control" disabled={!editMode}
                      onChange={handleChange} value={values.name}
                      id="name" placeholder="Enter name & surname" />
                  </div>
                  <div className="form-group col-md-6">
                    <ValidationLabel tag="Email" message={errors.email} />
                    <input type="email" className="form-control" disabled={!editMode}
                      onChange={handleChange} value={values.email}
                      id="email" placeholder="Email" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4" hidden={!includeUserDetails}>
                    <ValidationLabel tag="Username" message={errors.username} />
                    <input type="text" className="form-control" disabled={!editMode}
                      onChange={handleChange} value={values.username}
                      id="username" placeholder="Username" />
                  </div>
                  <div className="form-group col-md-4" hidden={!includeUserDetails}>
                    <ValidationLabel tag="Password" message={errors.password} />
                    <input type="password" className="form-control" disabled={!editMode}
                      onChange={handleChange} value={values.password}
                      id="password" placeholder="Password" />
                  </div>

                  <div className="form-group col-md-4">
                    <ValidationLabel tag="Role" message={errors.role} />
                    <select className="form-control" disabled={!editMode}
                      value={values.role}
                      name="role" id="role" onChange={handleChange}>
                      <option defaultValue>Student</option>
                      <option>Employee</option>
                      <option>Human Resources</option>
                    </select>
                  </div>
                </div>


                <div className="form-row">
                  <div className="form-group col-md-6">
                    <ValidationLabel tag="Department" message={errors.department} />
                    <select className="form-control" name="department" disabled={!editMode}
                      value={values.department}
                      id="department" onChange={handleChange}>
                      <option defaultValue>Department1</option>
                      <option>Department2</option>
                      <option>Department3</option>
                      <option>Department4</option>
                      <option>Department5</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <ValidationLabel tag="Position" message={errors.position} />
                    <select className="form-control" name="position" disabled={!editMode}
                      value={values.position}
                      id="position" onChange={handleChange}>
                      <option defaultValue>Position1</option>
                      <option>Position2</option>
                      <option>Position3</option>
                      <option>Position4</option>
                      <option>Position5</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <ValidationLabel tag="Phone Number" message={errors.phoneNumber} />
                    <input type="phoneNumber" className="form-control" disabled={!editMode}
                      onChange={handleChange} value={values.phoneNumber}
                      name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" />
                  </div>
                  <div className="form-group col-md-6">
                    <ValidationLabel tag="Office Number" message={errors.officeNo} />
                    <input type="number" className="form-control" disabled={!editMode}
                      onChange={handleChange} value={values.officeNo}
                      name="officeNo" id="officeNo" placeholder="Enter office number" />
                  </div>
                </div>

                <TimeTable editMode={editMode} addToTimeTable={addToTimeTable} timeTableLen={getTimeTableLen} />
                <label htmlFor="list">Added Courses</label>
                <ListCourses timeTable={timeTable} removeFromTable={removeFromTimeTable} editMode={editMode} />

                <button type="submit" hidden={!editMode} className="btn btn-info-light mt-3">{url.type.toUpperCase()} USER</button>
              </form>
            </div>
          </div>);
        }
      }
    </Formik>
  );
}
export default User;