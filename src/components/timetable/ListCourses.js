import { useState } from "react";

const ListCourses = props => {
  const [timeTable, setTimeTable] = useState(props.timeTable);
  function removeFromTable(id) {
    setTimeTable(prev => {
      return prev.filter(t => t.id != id);
    });
  }

  return (
    <div>
      <div className="card" style={{ minHeight: "60px" }}>
        <ul className="list-group" id="list">
          {
            timeTable.map(t => {
              return (
                <li class="py-3 shadow list-group-item" key={t.id}>
                  <div class="row">
                    <div class="col-6">
                      <span class="" > {t.className} </span>
                    </div>
                    <div class="col-5">
                      <span class="" > {t.hour} </span>
                    </div>
                    <div class="col-1">
                      <button class=" btn btn-danger btn-sm" onClick={(e) => removeFromTable(t.id)}>&#10008;</button>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}
export default ListCourses;