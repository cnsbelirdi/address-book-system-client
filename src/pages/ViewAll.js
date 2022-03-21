import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetUsers from "../components/GetUsers";
import { useAuth } from "../contexts/AuthContext";

const ViewAll = props => {

  return (
    <GetUsers />
  );
}
export default ViewAll;