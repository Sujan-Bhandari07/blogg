import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const Layout = lazy(() => import("./pages/Layout"));
const Auth = lazy(() => import("./components/Auth"));
const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Add = lazy(() => import("./pages/Add"));
const List = lazy(() => import("./pages/List"));
const Update = lazy(() => import("./pages/Update"));
const Login = lazy(() => import("./pages/Login"));
const Verifyotp = lazy(() => import("./pages/Verifyotp"));
const Notfound = lazy(() => import("./components/Notfound"));

import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<Loader />}>

      <Toaster position="top-right" duration={5000} />
      <Routes>
        <Route path="/" element={<Auth><Layout /></Auth>}>
        <Route index element={<Home/>}/>
        <Route path="blog/:id" element={<Blog />}/>
        <Route path="add" element={<Add />}/>
        <Route path="list" element={<List />}/>
        <Route path="update" element={<Update />}/>
        <Route path="login" element={<Login />}/>
        <Route path="verify-otp" element={<Verifyotp />}/>
        <Route path="dashboard" element={<Dashboard />}/>
        

        </Route>

        <Route path="*" element={<Notfound/>} />
      </Routes>

      </Suspense>
    </div>
  )
};

export default App;
