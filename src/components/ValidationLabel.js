const ValidationLabel = ({ message, tag }) => {
  return (
    <div className="d-flex flex-row">
      <label>{tag}</label>
      {message &&
        <div className="text-danger font-italic ml-3">({message}*)</div>
      }
    </div>
  );
}
export default ValidationLabel;