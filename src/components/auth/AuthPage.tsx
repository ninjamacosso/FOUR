import React from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  // Check if user is already authenticated
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 to-purple-900 p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          ERPFOUR
        </h1>
        <p className="text-center text-blue-200">
          Sistema ERP para Empresas Angolanas
        </p>
      </div>
      <LoginForm />
      <div className="mt-8 text-center text-blue-200 text-sm">
        <p>Para fins de demonstração, use:</p>
        <p>Email: admin@erpfour.com</p>
        <p>Senha: password</p>
      </div>
    </div>
  );
};

export default AuthPage;
