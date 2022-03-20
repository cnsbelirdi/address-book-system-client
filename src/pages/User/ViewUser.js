import User, { VIEW_URL } from "../../components/User";

const ViewUser = ({ username }) => {

  return (
    <div>
      <User username={username} editMode={false} title="View" url={VIEW_URL} />
    </div>
  );
}
export default ViewUser;