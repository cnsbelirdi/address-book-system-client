import { Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import ValidationLabel from "../ValidationLabel";

const TimeTable = ({ editMode, addToTimeTable }) => {

  const takeFirstLetters = course => {
    let courses = course.split(' ');
    let label = "";

    courses.forEach((c) => {
      if (c.length < 3) { label += c; return; }
      label += c[0];
    });
    return label;
  }



  const TimetableSchema = Yup.object().shape({
    time: Yup.string().required("Hour must be selected!"),
    day: Yup.number().required("Day must be selected"),
    course: Yup.string().required("Course must be selected!"),
    label: Yup.string().required("Label must be selected!")
  });


  return (
    <div>
      <Formik
        initialValues={{
          time: "09:00",
          day: 0,
          course: "Software Project Management",
          label: "SPM"
        }}
        onSubmit={(values) => {
          values.label = takeFirstLetters(values.course);
          addToTimeTable(values);
        }}
        validationSchema={TimetableSchema}
        isInitialValid={true}
      >
        {
          ({ errors, handleChange: handleTimeChange, values: timeValues, submitForm }) => {
            return (
              <div className="timetable" hidden={!editMode}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <ValidationLabel tag="Courses" message={errors.course} />

                    <select className="form-control" id="courses" name="course" onChange={(e) => {
                      handleTimeChange(e);
                      console.log(takeFirstLetters(e.target.value));
                    }}>
                      <option>Software Project Management</option>
                      <option>Object Oriented Programming II</option>
                      <option>Software Construction</option>
                      <option>Spanish II</option>
                      <option>Numerical Analysis</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <ValidationLabel tag="Course Time" message={errors.time} />
                    <select className="form-control" id="time" name="time" onChange={handleTimeChange}>
                      <option>09:00</option>
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                      <option>14:00</option>
                      <option>15:00</option>
                      <option>16:00</option>
                      <option>17:00</option>
                      <option>18:00</option>
                    </select>
                  </div>

                  <div className="form-group col-md-4">
                    <ValidationLabel tag="Course Day" message={errors.day} />
                    <select className="form-control" id="day" name="day" onChange={handleTimeChange} typeof="number">
                      <option value={0}>Monday</option>
                      <option value={1}>Tuesday</option>
                      <option value={2}>Wednesday</option>
                      <option value={3}>Thursday</option>
                      <option value={4}>Friday</option>
                      <option value={5}>Saturday</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <button className="mt-4_5 btn btn-primary" id="addCourse" onClick={submitForm} >&#10010;</button>
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