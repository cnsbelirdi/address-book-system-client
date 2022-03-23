import { Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import ValidationLabel from "../ValidationLabel";

const TimeTable = ({ editMode, addToTimeTable, timeTableLen }) => {

  const takeFirstLetters = course => {
    let courses = course.split(' ');
    let label = "";

    courses.forEach((c) => {
      if (c.length < 3) { label += c; return; }
      label += c[0];
    });
    console.log(label);
    return label;
  }

  const TimetableSchema = Yup.object().shape({
    hour: Yup.string().required("Hour must be selected!"),
    dayOfWeek: Yup.number().required("Day must be selected"),
    className: Yup.string().required("Course must be selected!"),
    label: Yup.string().required("Label must be selected!")
  });


  return (
    <div>
      <Formik
        initialValues={{
          hour: "09:00",
          dayOfWeek: 0,
          className: "Software Project Management",
          label: "SPM",
          id: 0
        }}
        onSubmit={(values) => {
          values.label = takeFirstLetters(values.className);
          values.id = timeTableLen();
          addToTimeTable(values);
        }}
        validationSchema={TimetableSchema}
        isInitialValid={true}
      >
        {
          ({ errors, handleChange, values, submitForm }) => {
            return (
              <div className="timetable" hidden={!editMode}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <ValidationLabel tag="Courses" message={errors.className} />

                    <select className="form-control" id="className" name="className" onChange={handleChange}>
                      <option>Software Project Management</option>
                      <option>Object Oriented Programming II</option>
                      <option>Software Construction</option>
                      <option>Spanish II</option>
                      <option>Numerical Analysis</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <ValidationLabel tag="Course Time" message={errors.hour} />
                    <select className="form-control" id="hour" name="hour" onChange={handleChange}>
                      <option value="09:00:00">09:00</option>
                      <option value="10:00:00">10:00</option>
                      <option value="11:00:00">11:00</option>
                      <option value="12:00:00">12:00</option>
                      <option value="13:00:00">13:00</option>
                      <option value="14:00:00">14:00</option>
                      <option value="15:00:00">15:00</option>
                      <option value="16:00:00">16:00</option>
                      <option value="17:00:00">17:00</option>
                      <option value="18:00:00">18:00</option>
                    </select>
                  </div>

                  <div className="form-group col-md-2">
                    <ValidationLabel tag="Course Day" message={errors.dayOfWeek} />
                    <select className="form-control" id="dayOfWeek" name="dayOfWeek" onChange={handleChange}>
                      <option value={0}>Monday</option>
                      <option value={1}>Tuesday</option>
                      <option value={2}>Wednesday</option>
                      <option value={3}>Thursday</option>
                      <option value={4}>Friday</option>
                      <option value={5}>Saturday</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <button className="mt-4_5 btn btn-info-light" type="button" id="addCourse" onClick={submitForm} >&#10010;</button>
                  </div>
                </div>
              </div>
            );
          }
        }
      </Formik>
    </div>
  );
}
export default TimeTable;