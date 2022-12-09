import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
// import Cookies from "js-cookie";

export default function LoginSuccess() {
  // const token = Cookies.get("jwt", { path: "/" });
  // console.log("🚀 ~ file: LoginSuccess.js:6 ~ LoginSuccess ~ token", token);
  // const [cookies, setCookies] = useCookies();
  // console.log(
  //   "🚀 ~ file: LoginSuccess.js:9 ~ LoginSuccess ~ cookies",
  //   cookies.jwt
  // );
  // (function () {
  //   var pairs = document.cookie;
  //   console.log("🚀 ~ file: LoginSuccess.js:15 ~ LoginSuccess ~ pairs", pairs);
  //   var cookies = {};
  //   for (var i = 0; i < pairs.length; i++) {
  //     var pair = pairs[i].split("=");
  //     cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
  //   }
  // })();

  return (
    <div className="flex flex-col items-center justify-center text-xxl text-black">
      <h1>Thanks for loggin in</h1>
      <button
        // onClick={handleCookie}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
      >
        Add more Information
      </button>
    </div>
  );
}
