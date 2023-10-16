import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { changePassword } from "../services/AuthService";
import { useAppContext } from "../context/AppContext";

function FormChangePassword({ onSubmit }) {

  const {setAlert} =  useAppContext();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleOldPassChange = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPassChange = (e) => {
    setNewPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await changePassword({ oldPass, newPass });

    if(res.status === 'ok'){
      setAlert({ show: true, message: "Contraseña Actualizada", type: "success" });
    
      onSubmit(res);
    }
    else{
      setAlert({ show: true, message: res.message , type: "error" });

    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-3">
        <TextInput
          label="Contraseña actual"
          value={oldPass}
          id="update-oldPass"
          name="update-oldPass"
          onChange={handleOldPassChange}
          placeholder="Contraseña actual"
        />

        <TextInput
          label="Contraseña nueva"
          value={newPass}
          id="update-newPass"
          name="update-newPass"
          onChange={handleNewPassChange}
          placeholder="Contraseña nueva"
        />
      </div>
      <div>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}

export default FormChangePassword;
