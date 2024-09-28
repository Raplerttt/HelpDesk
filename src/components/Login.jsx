import React from "react";

const Login = () => {
    return(
        <div className="flex items-center justify-between px-10 mt-20 max-w-6xl mx-auto">
      {/* Logo Section (Sebelah Kiri) */}
      <div className="flex flex-col items-center p-2">
        <img
          src="/assets/01.png"
          alt="Logo"
          className="w-80 h-80 mb-1"
        />
    <div className="flex flex-col items-center">
      <p className="text-orange-400 text-5xl font-bold">Pusat</p> {/* Tanpa margin bawah */}
      <p className="text-blue-700 text-5xl font-bold -mt-11">Bantuan</p> {/* Tanpa margin atas */}
    </div>
      </div>

      {/* Form Section (Sebelah Kanan) */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Masuk</h2>
        <form>
          <div className="mb-4">
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Masukkan Username Anda"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Masuk
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Lupa Password?
            </a>
          </div>
          <div className="flex items-center mt-5">
          <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/"
            >
              Belum Punya Akun?
            </a>
          </div>
        </form>
      </div>
    </div>
    );
};

export default Login;