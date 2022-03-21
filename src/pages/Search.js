import { useParams } from "react-router-dom";
import GetUsers from "../components/GetUsers";

const Search = props => {

  const { type, text } = useParams();
  console.log(type, text)
  return (
    <div>
      <GetUsers isSearch={true} type={type} searchText={text} />
    </div>
  );
}
export default Search;