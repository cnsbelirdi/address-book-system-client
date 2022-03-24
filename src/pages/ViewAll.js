import { useParams } from "react-router-dom";
import GetUsers from "../components/GetUsers";

const ViewAll = props => {
  const { page, sort } = useParams();
  return (
    <GetUsers params={{ page, sort }} />
  );
}
export default ViewAll;