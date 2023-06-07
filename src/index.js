import React from 'react';
import './index.css';
import Main from './cards/Main';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import Models from "./pages/Models";
import Visualization from "./pages/Visualization";
import Profile from "./pages/Profile";
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';


export default function App() {
  return (
  
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="datasets" element={<Datasets />} />
        <Route path="models" element={<Models />} />
        <Route path="visualization" element={<Visualization />} />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  
  );
}

ReactDOM.render(<Router>
                  <Auth0ProviderWithHistory>
                    <App />
                  </Auth0ProviderWithHistory>
                </Router>, document.getElementById("root"));


