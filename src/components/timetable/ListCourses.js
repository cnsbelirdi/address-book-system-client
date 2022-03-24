import { useEffect, useState } from "react";

const ListCourses = props => {
  const [timeTable, setTimeTable] = useState(props.timeTable);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    setTimeTable(props.timeTable);
  }, [props.timeTable])

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
                      <span class="" > {t.className} ({t.label})</span>
                    </div>
                    <div class="col-3">
                      <span class="" > {days[t.dayOfWeek]} </span>
                    </div>
                    <div class="col-2">
                      <span class="" > {t.hour.slice(0, 5)} </span>
                    </div>
                    <div class="col-1">
                      <button class=" btn btn-danger btn-sm" id="removeTimetable" type="button" hidden={!props.editMode} onClick={(e) => props.removeFromTable(t.id)}>&#10008;</button>
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