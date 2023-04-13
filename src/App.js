import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import Layout from './layouts/Layout';
import RawData from './pages/raw-data-page/RawDataPage';
import ResourcesPage from './pages/resources-page/ResourcesPage';
import ApplicationsPage from './pages/applications-page/ApplicationsPage';
import { useEffect } from 'react';
import ResourceByNamePage from './pages/resource-by-name/ResourceByNamePage';
import ApplicationByNamePage from './pages/application-by-name/ApplicationByNamePage';
import AppToResourcePage from './pages/app-to-resource/AppToResourcePage';


function App() {

  const navigate = useNavigate();
  useEffect(() => {
    // navigate("/raw-data")
  }, [])

  return (
    <div className="App">
      <Routes >
        <Route path="/" >
          <Route element={<Layout />}  >
            <Route path="raw-data" element={<RawData />} />
            <Route path="resources" >
              <Route index element={<ResourcesPage />} />
              <Route path=':resourceName'  >
                <Route index element={<ResourceByNamePage />} />
                <Route path="applications/:appName" element={<AppToResourcePage />} />

              </Route>
            </Route>
            <Route path="applications"  >
              <Route index element={<ApplicationsPage />} />
              <Route path=':appName' >
                <Route index element={<ApplicationByNamePage />} />
                <Route path="resources/:resourceName" element={<AppToResourcePage />} />
              </Route>
            </Route>

          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
