import React, { useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";

import { useAppContext } from "../context/AppContext";
import { register, getPreview } from "../services/LinkService";
import TextareaInput from "./TextareaInput";

function FormRegisterLink({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [image, setImage] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [domain, setDomain] = useState(null);

  const [btnSubmit, setBtnSubmit] = useState(true);
  const [btnSearch, setbtnSearch] = useState(false);

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
    let res = await register({ title, url, description, image, domain, favicon });
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

  const getPreviewLink = async () => {
    setBtnSubmit(true);

    setbtnSearch(true);

    let res = await getPreview({ url });
    if (res.status === "ok") {
      setTitle(res.data.title);
      setDescription(res.data.description);

      setImage(res.data.img);
      setDomain(res.data.domain);
      setFavicon(res.data.favicon);

      setAlert({ show: true, type: "success", message: res.message });

      setBtnSubmit(false);
    } else {
      setAlert({ show: true, type: "error", message: res.message });
    }
    setbtnSearch(false);
    console.log(res);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-3">
        <div className="flex space-x-3">
          <div className="w-3/4">
            <TextInput
              id="link-url"
              name="link-url"
              label="URL"
              value={url}
              onChange={handleUrlChange}
              placeholder="URL"
            />
          </div>
          <div className="w-1/4">
            <Button
              onClick={getPreviewLink}
              color="indigo"
              disabled={btnSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
          </div>
        </div>

        <TextInput
          label="Titulo"
          value={title}
          id="link-title"
          name="link-title"
          onChange={handleTitleChange}
          placeholder="Ingrese un titulo"
        />

        <TextareaInput
          id="link-description"
          name="link-description"
          label="Descripción"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Descripción"
        />
      </div>
      <div className="bg-slate-400">
        {image && <img className="max-h-40 mx-auto" src={image} alt={title} />}
      </div>
      <div>
        <Button disabled={btnSubmit} type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
}

export default FormRegisterLink;
