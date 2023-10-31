import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { updateProfile } from "../services/AuthService";
import { useAppContext } from "../context/AppContext";

function FormProfile({ onSubmit }) {
  const { setAlert, user, setUser } = useAppContext();

  const [userName, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await updateProfile({ userName, email });

    if (res.status === "ok") {
      setAlert({
        show: true,
        message: "Datos Actualizados",
        type: "success",
      });

      setUser({
        ...user,
        username: userName,
        email: email,
      });

      onSubmit(res);
    } else {
      setAlert({ show: true, message: res.message, type: "error" });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-3">
        <TextInput
          label="Nombre de usuario"
          value={userName}
          id="update-username"
          name="update-username"
          onChange={handleUserNameChange}
          placeholder="Nombre de usuario"
        />

        <TextInput
          label="Correo electronico"
          value={email}
          id="update-email"
          name="update-email"
          onChange={handleEmailChange}
          placeholder="Correo electronico"
        />
      </div>
      <div>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}

export default FormProfile;
