import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { singUp } from "../../services/AuthService";

import { useAppContext } from "../../context/AppContext";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn, setUser, setAlert } = useAppContext();

  useEffect(() => {
    if (isLoggedIn) navigate("/user", { replace: true });
  }, [isLoggedIn, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await singUp({ email, password, userName });

    if (res.status === "ok") {
      console.log(res);
      setUser(res.data);
      setIsLoggedIn(true);
    }

    else{
      setAlert({ show: true, type: "error", message: res.message });
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Regístrate para crear una cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-3">
            <TextInput
              value={userName}
              id="register-username"
              name="register-username"
              onChange={handleUserNameChange}
              placeholder="Nombre de usuario"
            />

            <TextInput
              value={email}
              id="register-email"
              name="register-email"
              onChange={handleEmailChange}
              placeholder="Ingresa tu correo electrónico"
            />

            <TextInput
              value={password}
              id="register-password"
              name="register-password"
              type="password"
              onChange={handlePasswordChange}
              placeholder="Contraseña"
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Ya tengo una cuenta
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit">Registrarme</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
