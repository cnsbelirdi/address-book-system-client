import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import ValidationLabel from "../../components/ValidationLabel";
import { useAuth } from "../../contexts/AuthContext";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const Login = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();


  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username is required'),
    password: Yup.string().min(8, "Too Short!").max(50, "Too Long!").required('Password is required'),
  });

  return (
    <div className="card bg-light mt-2 mb-2">

      <div className="card-body">
        <Formik
          initialValues={
            {
              username: username,
              password: password
            }
          }
          enableReinitialize={true}
          isInitialValid={false}
          validationSchema={LoginSchema}

          onSubmit={async values => {
            let result;
            await axios.post('api/auth/login', { username: values.username, password: values.password })
              .catch(e => { console.log(e); setMessage(e.message) }).then(res => result = res);

            if (result && result.data) {
              if (result.data.status === "OK") {
                setAuth({
                  username: result.data.username,
                  role: result.data.role
                });
                localStorage.setItem('jwt', `Bearer ${result.data.jwt}`);

                setMessage('Successful!');
                navigate('/');
                return;
              }
              console.log(result);
              setMessage(result.data.message);
              return;
            }
          }}
        >
          {
            ({ errors, handleChange, handleSubmit, values }) => {
              return (
                <form>
                  <div className="form-column">
                    <div className="form-group col-md-6">
                      <ValidationLabel tag="Username" message={errors.username} />
                      <input type="text" className="form-control"
                        onChange={handleChange} value={values.name}
                        id="username" placeholder="Enter Username" />
                    </div>

                    <div className="form-group col-md-6">
                      <ValidationLabel tag="Password" message={errors.password} />
                      <input type="password" className="form-control"
                        onChange={handleChange} value={values.name}
                        id="password" placeholder="Enter Password" />
                    </div>
                    <button type="button" onClick={handleSubmit} className="btn btn-info-light ml-3">Login</button>
                  </div>
                </form>
              )
            }
          }
        </Formik>

        {
          message && <div className="text-danger font-italic ml-3 mt-3">({message}*)</div>
        }

      </div>
    </div>
  );
}
export default Login;