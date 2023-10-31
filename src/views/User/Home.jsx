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
import FormProfile from "../../components/FormProfile";

function Home() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { user, setLinks, links } = useAppContext();

  const [search, setSearch] = useState("");
  const [searchByDay, setsearchByDay] = useState("");
  const [searchByUsername, setsearchByUsername] = useState("");

  const filterListLinks = async ({
    _search,
    _searchByDay,
    _searchByUsername,
  }) => {
    console.log("Buscando...");
    // Si se ha ingresado una búsqueda, realiza la búsqueda
    let res = await searchLinks({
      keyword: _search,
      day: _searchByDay,
      username: _searchByUsername,
    });

    console.log(res);
    setLinks(res.data.links);
  };

  const handleSearchChange = async (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);

    if (inputValue.length >= 3 || inputValue === "") {
      await filterListLinks({
        _search: inputValue,
        _searchByDay: searchByDay,
        _searchByUsername: searchByUsername,
      });
    }
  };

  const handleSearchByDayChange = async (e) => {
    const inputValue = e.target.value;
    setsearchByDay(inputValue);
    await filterListLinks({
      _search: search,
      _searchByDay: inputValue,
      _searchByUsername: searchByUsername,
    });
  };

  const handleSearchByUsernameChange = async (e) => {
    const inputValue = e.target.value;
    setsearchByUsername(inputValue);

    if (inputValue.length >= 2 || inputValue === "") {
      await filterListLinks({
        _search: search,
        _searchByDay: searchByDay,
        _searchByUsername: inputValue,
      });
    }
  };

  const modalRef = useRef();
  const modalAvatarRef = useRef();
  const modalPasswordRef = useRef();
  const modalProfileRef = useRef();

  const onSuccess = () => {
    modalRef.current.closeModal();
    modalAvatarRef.current.closeModal();
    modalPasswordRef.current.closeModal();
    modalProfileRef.current.closeModal();
  };

  useEffect(() => {
    const getLinks = async () => {
      let res = await list();

      console.log(res.data.links);
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
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm sticky top-5 ">
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
              <div className="mt-4 absolute top-0">
                <Modal
                  title="Actualizar Avatar"
                  textButton={
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
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                  ref={modalAvatarRef}
                >
                  <FormAvatarUpload onSubmit={onSuccess} />
                </Modal>
              </div>

              <div className="mt-4">
                <Modal
                  title="Actualizar perfil"
                  textButton="Actualizar perfil"
                  ref={modalProfileRef}
                >
                  <FormProfile onSubmit={onSuccess} />
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
              <div className="flex space-x-3 mb-3">
                <div className="w-1/2">
                  <TextInput
                    placeholder="Buscar por fecha"
                    onChange={handleSearchByDayChange}
                    id="search-day"
                    name="search-day"
                    value={searchByDay}
                    type="date"
                  />
                </div>
                <div className="w-1/2">
                  <TextInput
                    placeholder="Buscar por nombre de  usuario"
                    onChange={handleSearchByUsernameChange}
                    id="search-username"
                    name="search-username"
                    value={searchByUsername}
                  />
                </div>
              </div>

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
