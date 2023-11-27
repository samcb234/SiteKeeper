
import './App.css';
import React, { useEffect, useState } from 'react';


import { Homepage } from "./layouts/Homepage/Homepage";
import { SitePage } from "./layouts/Sitepage/SitePage";
import { DisciplinePage } from "./layouts/DisciplinePage/DisciplinePage";
import { UplaodRepositoryPage } from './layouts/UploadRepositoryPage/UploadRepositoryPage';
import { Route, Switch } from 'react-router-dom';
import { NavAdmin } from "./layouts/Nav/NavAdmin";
import { AdminHome } from "./layouts/AdminPage/AdminHome";
import { AdminSite } from "./layouts/AdminPage/components/AdminSite";
import { CreateProjectPage } from './layouts/CreateProjectPage/CreateProjectPage';
import { BaseFeatures } from './layouts/BaseFeatures/BaseFeatures';

import { TerminalPage } from "./layouts/TerminalPage/TerminalPage";
import { FrameworkPage } from "./layouts/FrameworkPage/FrameworkPage";
import { AddFeaturePage } from "./layouts/AddFeaturePage/AddFeaturePage";

import { ProjectPage } from './layouts/ProjectPage/ProjectPage';
import { Feature } from './layouts/FeaturePage/Feature';
import { UserPage } from './layouts/UserPage/UserPage';
import { AddPeripheralPage } from './layouts/AddPeripheralPage/AddPeripheralPage';
import { EditInfo } from "./layouts/EngineerPage/components/EditInfo";
import { VerifyFeature } from "./layouts/EngineerPage/components/VerifyFeature";
import UserModel from './models/User/UserModel';
import { httpGetRequest } from './layouts/Utils/TsFunctions';
import { config } from './config/Constants';
import { UserSettingsPage } from './layouts/UserSettingsPage/UserSettingsPage';
import { PictographExample } from './layouts/PictographExample/PictographExample';

function App() {
  // Logic to differentiate between what notification bar could be placed here
  const [user, setUser] = useState<UserModel>()
  const [refresh, setRefresh] = useState(true)

  function reload() {
    setRefresh(!refresh)
  }

  useEffect(() => {
    const fetchUser = async () =>{
      const user = await httpGetRequest(config.API_URL + `/api/user/getLoggedInUser`, 'error fetching user');
      if(user != null) {
        setUser(user)
      } else {
        // nothing?
      }
    }
    fetchUser()
}, [refresh])

  return (

    <>
      <NavAdmin user={user}/>
      <Switch>
        <Route path='/' exact>
          <Homepage/>
        </Route>
        <Route path='/uploadProjectRepository'>
          <UplaodRepositoryPage />
        </Route>
        <Route path='/site'>
          <SitePage user={user}/>
        </Route>
        <Route path='/visitor'>
          <Homepage/>
        </Route>
        <Route path='/discipline'>
          <DisciplinePage />
        </Route>
        <Route path='/admin'>
          <AdminHome />
        </Route>
        <Route path='/addTerminal'>
          <TerminalPage />
        </Route>
        <Route path='/addFramework'>
          <FrameworkPage />
        </Route>
        <Route path='/addFeature'>
          <AddFeaturePage />
        </Route>
        <Route path='/editInfo'>
          <AdminSite />
        </Route>
        <Route path='/createProject'>
          <CreateProjectPage />
        </Route>
        <Route path='/project'>
          <ProjectPage user={user}/>
        </Route>
        <Route path='/feature'>
          <Feature />
        </Route>
        <Route path='/user'>
          <UserPage />
        </Route>
        <Route path='/addPeripheral'>
          <AddPeripheralPage />
        </Route>
        <Route path='/engineer'>
          <SitePage user={user}/>
        </Route>
        <Route path='/editInfo'>
          <EditInfo />
        </Route>
        <Route path='/verifyFeature'>
          <VerifyFeature />
        </Route>
        <Route path={'/userSettings'}>
          <UserSettingsPage user={user} refresh={refresh} reload={reload}/>
        </Route>
        <Route path={'/featureStatistics'}>
          <PictographExample/>
        </Route>
      </Switch>
    </>


  );
}

export default App;
