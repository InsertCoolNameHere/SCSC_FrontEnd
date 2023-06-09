import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import Models from "./pages/Models";
import DataDashboard from "./pages/DataDashboard";
import Analysis from "./pages/Analysis";
import About from "./pages/About";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import SCSC from "./pages/SCSC";
import Tutorial from "./pages/Tutorial";
import ExternalApi from "./pages/ExternalApi";
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import './cards/wireframe.css';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/loading";
import ProtectedRoute from './auth/protected-route';


export default function App() {
  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
  
    <Routes>
        < Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="help" element={<Help />} />
          <Route path="datasets" element={<Datasets />} />
          <Route path="models" element={<Models />} />
          <Route path="dashboard" element={<DataDashboard />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="profile" element={<Profile />} />
          <Route path="api" element={<ExternalApi />} />
          <Route path="scsc" element={<SCSC />} />
          <Route path="tutorial" element={<Tutorial />} />
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


