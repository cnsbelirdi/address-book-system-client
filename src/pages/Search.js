import { useParams } from "react-router-dom";
import GetUsers from "../components/GetUsers";
import { useAuth } from "../contexts/AuthContext";

const Search = props => {

  const { type, text } = useParams();
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <GetUsers isSearch={true} type={type} searchText={text} auth={auth} />
    </div>
  );
}
export default Search;