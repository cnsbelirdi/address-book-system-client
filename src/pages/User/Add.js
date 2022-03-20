import User, { ADD_URL } from "../../components/User";

const Add = props => {

  return <User title="Add" includeUserDetails={true} url={ADD_URL} />
}
export default Add;