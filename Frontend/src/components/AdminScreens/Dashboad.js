import React, { useContext, useEffect, useState } from "react";
import "../../Css/Dashboard.css";
// import AdminTopScreen from './AdminTopScreen';
import { AuthContext } from "../../Context/AuthContext";
// import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboad = () => {
  const { config } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  // const navigate = useNavigate()
  useEffect(() => {
    const getStoryInfo = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/admin/getAllUsers`, config);
        const dataFinal = data.data;
        console.log(dataFinal);
        // console.log(dataFinal._id);
        setUserData(dataFinal);
        setLoading(false);
      } catch (error) {
        // navigate("/")
      }
    };
    getStoryInfo();
  }, [config]);

  // console.log(setUserData);
  return (
    <div style={{ minWidth: "850px", width: "1050px", margin: "auto" }}>
      {loading ? (
        "Loading..."
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <AdminTopScreen /> */}
          <div
            style={{
              width: "100%",
              display: "flex",
              marginBottom: "1.5rem",
              justifyContent: "space-between",
              fontWeight: 600,
              fontSize: "1.09rem",
            }}
          >
            <div>Username</div>
            <div>Email</div>
            <div>Password</div>
            <div>Edit</div>
          </div>

          {userData?.map((item) => {
            console.log(item);
            return (
              <div
                key={item._id}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p>{item.username}</p>
                <p>{item.email}</p>
                <p>{item.active.toString()}</p>
                <button>
                <Link className='editStoryLink' to={`/user/editByAdmin?id=${item._id}&active=${item.active}`} >
                       Edit <FiEdit />
                      </Link></button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboad;
