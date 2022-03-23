import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createTableElements from "../methods/table";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Auth/Login";

const Home = props => {

  const [timeTables, setTimeTables] = useState(createTableElements([]));


  const [user, setUser] = useState({
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
  });


  const [auth, setAuth] = useAuth();

  useEffect(async () => {
    await getUser()
  }, [auth]);


  async function getUser() {
    let username = auth.username;

    if (username != '') {
      let response;

      await axios.get(`api/book_user/${username}`)
        .then(res => response = res)
        .catch(x => console.log(x));

      if (response && response.status === 200) {
        setUser(response.data);
        setTimeTables(createTableElements(response.data.timeTable));
      }
    }
  }


  return (
    <div className="card bg-light mt-2 mb-2" >
      <div className="card-body">
        {
          auth.username != '' ? <UserHome user={user} timeTables={timeTables} />
            : <div>
              <h5 className="card-title">Welcome to Uskudar University Address Book!</h5>
              <Login />
            </div>
        }
      </div>
    </div>
  );
}
export default Home;


const UserHome = ({ user, timeTables }) => {

  const tableHours = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];
  const colors = ["aqua", "darkolivegreen", "mediumvioletred", "gray", "pink", "yellowgreen", "yellow"];
  const navigate = useNavigate();

  const titleValuePairs = [
    { title: "Full Name", value: "name" },
    { title: "Department", value: "department" },
    { title: "Position", value: "position" },
    { title: "Phone Number", value: "phoneNo" },
    { title: "E-mail", value: "email" },
    { title: "Office no", value: "officeNo" },
    { title: "Role", value: "role" }
  ]

  return (
    <div>
      <h5 className="card-title">Welcome to Uskudar University Address Book, {user.name}!</h5>

      <div class="card mb-3">
        <div class="card-body">
          {
            titleValuePairs.map(i => {
              return (
                <div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">{i.title}</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{user[i.value]}</div>
                  </div>
                  <hr />
                </div>
              );
            })
          }
          <div class="row">
            <div class="col-sm-12">
              <a class="btn btn-info-light" onClick={() => navigate('/user/edit/' + user.username)}>Edit Informations</a>
            </div>
          </div>
        </div>
      </div>



      <h5 className="card-text">Time Table</h5>

      {/* <!-- TIME TABLE--> */}

      <div className="table-responsive">
        <table className="table table-bordered text-center">

          {/* <!-- COLS --> */}
          <thead>
            <tr className="bg-light-gray">
              <th className="text-uppercase">Time
              </th>
              <th className="text-uppercase">Monday</th>
              <th className="text-uppercase">Tuesday</th>
              <th className="text-uppercase">Wednesday</th>
              <th className="text-uppercase">Thursday</th>
              <th className="text-uppercase">Friday</th>
              <th className="text-uppercase">Saturday</th>
            </tr>
          </thead>

          {/* <!-- ROWS--> */}

          <tbody>
            {
              tableHours.map(hour => {

                return (
                  <tr>
                    <td className="align-middle">{hour}</td>
                    {
                      timeTables[hour].map(t => {
                        if (t.label != '') console.log(t.label != '');
                        if (t.label) {
                          return <td >
                            <span style={{ backgroundColor: colors[Math.floor(Math.random() * 5)] }} className="padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">{t.label}</span>
                            <div className="margin-10px-top font-size14">{t.className}</div>
                          </td>
                        }
                        return <td className="bg-light-gray"></td>
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}