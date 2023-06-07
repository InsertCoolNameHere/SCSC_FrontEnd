import React from "react";
import {Outlet} from "react-router-dom";
import Top_Menubar from '../components/Top_Menubar';
import SideBar from '../components/SideBar'

const Layout = () => {
  return (
    <>
      <Top_Menubar />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
      <div class="py-2" />
      <div class="py-5">
          <div class="container">
              <div class="row">
                  <div class="col-md-3 p-0">
                      <SideBar />
                  </div>
                  <div class="col-md-9">
                    <Outlet />
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default Layout;