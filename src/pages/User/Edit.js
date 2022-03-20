import User, { EDIT_URL } from "../../components/User";

const Edit = props => {


  return (
    <div>
      <User editMode={true} title={"Edit"} includeUserDetails={false} url={EDIT_URL} />
    </div>
  );
}
export default Edit;