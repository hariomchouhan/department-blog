import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { config } = useContext(AuthContext);
  const [active, setActive] = useState(true);
  const [formData, setFormData] = useState({
    active: active,
    newPassword: "",
    _id: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const getInfo = async () => {
      const query = location.search;
      const finalLocation = query.substring(4);
      let result = finalLocation.split("&").at(-1).substring(7);
      let mybool = JSON.parse(result);
      const id = finalLocation.split("&").at(0);
      setFormData((prev) => {
        return { ...prev, active: mybool, newPassword: "", _id: id };
      });

      // console.log(id);
    };
    getInfo();
  }, [location.search, active]);
  console.log(active);
  // console.log(active);

  const changeHandler = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
        await axios.put(`/admin/updateUserByAdmin`, formData, config)

        // setSuccess('Edit Story successfully ')

        setTimeout(() => {
            navigate('/dashboard')
        }, 2500)

    }
    catch (error) {
        setTimeout(() => {
            // setError('')
        }, 4500)
        // setError(error.response.data.error)
    }
  };
  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="password">New Password</label>
          <input
            type="text"
            placeholder="6+ strong character"
            id="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={changeHandler}
          />

          <input
            type="checkbox"
            name="active"
            id="Candidates"
            className="h-4 w-4 rounded"
            onChange={changeHandler}
            checked={formData.active}
          />
          <label htmlFor="active" className="font-medium text-gray-900">
            {formData.active === true ? "Active" : "Deactive"}
          </label>

          <button>Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
