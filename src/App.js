import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './features/HomePage/Home/Home';
import Login from './features/HomePage/authentication/Login/Login';
import Register from './features/HomePage/authentication/Register/Register';
import VerifyAccount from './features/HomePage/authentication/VerifyAccount/VerifyAccount';

import NotFound from './share/components/NotFound/NotFound';
import LoadingSpinner from './share/components/LoadingSpinner/LoadingSpinner';
import { useSelector } from 'react-redux';
import Layout from './features/Workspaces/Layout/Layout';
import KanBanBoard from './features/Workspaces/components/KanBan/KanBanBoard';
import ProjectForm from './features/Workspaces/components/Project/ProjectForm';
import HomeLayout from './features/HomePage/HomeLayout';

function App() {
  const token = useSelector((state) => state.auth.accessToken);
  const success = useSelector((state) => state.auth.success);

  let routes;
  console.log('token', !token, 'success', success);
  if (!token && !success) {
    routes = (
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-account" element={<VerifyAccount />} />
        </Route>
        <Route path="/project" element={<Navigate to={'/home'} />}>
          <Route path="board" element={<Navigate to={'/home'} />} />
          <Route path="settings" element={<Navigate to={'/home'} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to={'/home'} />} />
        <Route path="/" element={<HomeLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-account" element={<VerifyAccount />} />
        </Route>
        <Route path="/project" element={<Layout />}>
          <Route path="board" element={<KanBanBoard />} />
          <Route path="settings" element={<ProjectForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <main>
        <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
      </main>
    </BrowserRouter>
  );
}

export default App;
