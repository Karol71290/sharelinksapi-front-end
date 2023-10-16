import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

import { recoverPassword } from "../../services/AuthService";

import { useAppContext } from "../../context/AppContext";

import { useNavigate } from "react-router-dom";

function RecoverPassword() {
  const navigate = useNavigate();
  const { isLoggedIn, setAlert } = useAppContext();

  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/user", { replace: true });
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await recoverPassword({ email });
    if (res.status === "ok") {
      navigate("/password-reset", { replace: true });
      setAlert({ show: true, type: "success", message: res.message });
    } else {
      setAlert({ show: true, type: "error", message: res.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Restablecer contraseña
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-3">
            <TextInput
              label="Dirección de correo electrónico"
              value={email}
              id="login-email"
              name="login-email"
              onChange={handleEmailChange}
              placeholder="Ingresa tu correo electrónico"
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Ingresar
              </Link>
            </div>
          </div>

          <div>
            <Button color={"indigo"} type="submit">
              Enviar correo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
