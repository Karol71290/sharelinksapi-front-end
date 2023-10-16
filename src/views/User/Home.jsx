import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { list, searchLinks } from "../../services/LinkService";

import Navbar from "../../components/Navbar";
import TextInput from "../../components/TextInput";
import FormAvatarUpload from "../../components/FormUploadAvatar";
import Modal from "../../components/Modal";
import FormChangePassword from "../../components/FormChangePassword";
import FormRegisterLink from "../../components/FormRegisterLink";
import ItemLink from "../../components/ItemLink";



function Home() {

  const BASE_URL = process.env.REACT_APP_API_URL ;
  const { user, setLinks, links } = useAppContext();

  const [search, setSearch] = useState("");

  const handleSearchChange = async (e) => {

    const inputValue = e.target.value;
    setSearch(inputValue);

    if (inputValue.length >= 3 || inputValue === "") {
      console.log("Buscando...");
      let res;
      if (inputValue === "") {
        // Si el campo de búsqueda está vacío, obtén todos los enlaces
        res = await list();
      } else {
        // Si se ha ingresado una búsqueda, realiza la búsqueda
        res = await searchLinks({ keyword: inputValue });
      }
      console.log(res);
      setLinks(res.data.links);
    }

  };

  const modalRef = useRef();
  const modalAvatarRef = useRef();
  const modalPasswordRef = useRef();



  const onSuccess = () => {
    modalRef.current.closeModal();
    modalAvatarRef.current.closeModal();
    modalPasswordRef.current.closeModal();
  };

  useEffect(() => {
    const getLinks = async () => {
      let res = await list();
      setLinks(res.data.links);
    };
    getLinks();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto px-4 md:w-lg lg:max-w-5xl xl:max-w-5xl py-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-5">
          <div>
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm sticky top-5">
              <div className="relative w-40 h-40 mx-auto">
                <img
                  key={user?.id}
                  loading="lazy"
                  src={
                    user?.avatar
                      ? `${BASE_URL}/${user.avatar}`
                      : "https://cdn.vectorstock.com/i/preview-1x/84/89/profile-picture-placeholder-vector-38978489.webp"
                  }
                  alt="Foto de perfil"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-2xl font-semibold"> {user?.username} </h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <div className="mt-4">
                <Modal
                  title="Actualizar Avatar"
                  textButton="Actualizar Avatar"
                  ref={modalAvatarRef}
                >
                  <FormAvatarUpload onSubmit={onSuccess} />
                </Modal>
              </div>

              <div className="mt-4">
                <Modal
                  title="Cambiar contraseña"
                  textButton="Cambiar contraseña"
                  ref={modalPasswordRef}
                >
                  <FormChangePassword onSubmit={onSuccess} />
                </Modal>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className=" mx-auto bg-indigo-50 rounded-xl  p-6">
              <div className="flex space-x-3">
                <div className="w-3/4">
                  <TextInput
                    placeholder="Buscar"
                    onChange={handleSearchChange}
                    id="search"
                    name="search"
                    value={search}
                  />
                </div>
                <div className="w-1/4">
                  <Modal
                    title="Registrar nuevo link"
                    textButton="Nuevo"
                    ref={modalRef}
                  >
                    <FormRegisterLink onSubmit={onSuccess} />
                  </Modal>
                </div>
              </div>
            </div>

            <div className="mt-5 md:mt-10">
              {links.map((item) => (
                <ItemLink key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
