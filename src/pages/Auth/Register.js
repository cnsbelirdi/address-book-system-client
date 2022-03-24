import User, { REGISTER_URL } from "../../components/User";

const Register = props => {

  return <User includeUserDetails={true} url={REGISTER_URL} />
}
export default Register;