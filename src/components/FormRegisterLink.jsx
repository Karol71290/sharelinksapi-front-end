import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";

import { useAppContext } from "../context/AppContext";
import { register } from "../services/LinkService";

function FormRegisterLink({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const { links, setLinks, user, setAlert } = useAppContext();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await register({ title, url, description });
    if (res.status === "ok") {
      const newLink = {
        ...res.data.link,
        owner: true,
        votedByMe: false,
        votes: 0,
        username: user.username,
      };
      // Modificar el array original agregando el nuevo elemento al principio
      links.unshift(newLink);

      // Actualizar el estado con el array modificado
      setLinks([...links]);

      setAlert({ show: true, type: "success", message: "Registro exitoso" });
      onSubmit();
    } else {
      setAlert({ show: true, type: "error", message: res.message });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-3">
        <TextInput
          label="Titulo"
          value={title}
          id="link-title"
          name="link-title"
          onChange={handleTitleChange}
          placeholder="Ingrese un titulo"
        />

        <TextInput
          id="link-url"
          name="link-url"
          label="URL"
          value={url}
          onChange={handleUrlChange}
          placeholder="URL"
        />

        <TextInput
          id="link-description"
          name="link-description"
          label="Descripción"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Descripción"
        />
      </div>
      <div>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}

export default FormRegisterLink;
