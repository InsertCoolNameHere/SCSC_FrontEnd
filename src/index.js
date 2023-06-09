import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import Models from "./pages/Models";
import Visualization from "./pages/Visualization";
import Profile from "./pages/Profile";
import ExternalApi from "./pages/ExternalApi";
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import './cards/wireframe.css';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./components/loading";
import ProtectedRoute from './auth/protected-route';


export default function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
  
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="datasets" component={<Datasets />} />
          <Route path="models" element={<Models />} />
          <Route path="visualization" element={<Visualization />} />
          <Route path="profile" element={<Profile />} />
          <Route path="external-api" element={<ExternalApi />} />
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


