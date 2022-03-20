import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Login = props => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    let result;
    await axios.post('api/auth/login', { username, password })
      .catch(e => { console.log(e); setMessage(e.message) }).then(res => result = res);

    if (result && result.data) {
      if (result.data.status === "OK") {
        setAuth({
          username: result.data.username,
          role: result.data.role
        });
        localStorage.setItem('jwt', `Bearer ${result.data.jwt}`);

        setMessage('Successful!');

        return;
      }
      console.log(result)
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

      {message != '' && <p>{message}</p>}
    </div>
  );
}
export default Login;