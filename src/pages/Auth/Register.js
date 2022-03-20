import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";
import User, { REGISTER_URL } from "../../components/User";

const Register = props => {

  const [auth, setAuth] = useAuth();

  return <User includeUserDetails={true} url={REGISTER_URL} />
}
export default Register;

// add new user -> book_user
// register -> auth
// edit user -> book_user/edit