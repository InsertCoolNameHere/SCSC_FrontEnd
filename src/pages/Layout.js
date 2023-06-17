import React from "react";
import {Outlet} from "react-router-dom";
import Top_Menubar from '../components/Top_Menubar';
import '../index.css';

const Layout = () => {
  return (
    <>
    <div class="py-1" />
      <Top_Menubar />
      <div class="py-4" />
      
      
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
      <div class="py-2" />
                    <Outlet />
    </>
  );
};

export default Layout;