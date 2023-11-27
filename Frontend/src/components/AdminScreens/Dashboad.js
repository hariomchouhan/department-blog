import React, { useContext, useEffect, useState } from "react";
import "../../Css/Dashboard.css";
import { AuthContext } from "../../Context/AuthContext";
// import { useNavigate } from 'react-router-dom';
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
        // console.log(dataFinal);
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
    <div style={{ overflowX: "auto", maxWidth: "1050px", margin: "auto" }}>
      {loading ? (
        "Loading..."
      ) : (
       
          <table
             style={{
              minWidth: "980px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <tr style={{
              width: "100%",
              display: "flex",
              marginBottom: "1.5rem",
              justifyContent: "space-between",
              fontWeight: 600,
              fontSize: "1.09rem",
            }}>
            <div>Username</div>
            <div>Email</div>
            <div>Active</div>
            <div>Edit</div>
            </tr>
          

          {userData?.map((item) => {
            console.log(item);
            return (
              <tr
                key={item._id}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "2px solid gray",
                }}
              >
                <td style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "120px", marginBottom: "20px", marginTop: "20px"}}>{item.username}</td>
                <td style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "120px"}}>{item.email}</td>
                <td style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "40px"}}>{item.active.toString()}</td>
                <td>
                <button>
                <Link className='editStoryLink' to={`/user/editByAdmin?id=${item._id}&active=${item.active}`} >
                       Edit <FiEdit />
                      </Link></button>
                      </td>
              </tr>
            );
          })}
     </table>
      )}
    </div>
  );
};

export default Dashboad;
