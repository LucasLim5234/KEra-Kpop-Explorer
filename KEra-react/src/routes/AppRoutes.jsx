import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import AuthGuard from "../pages/auth/AuthGuard";
import GuestGuard from "../pages/auth/GuestGuard";
import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";

import FanIndex from "../pages/users/fans/FanIndex";
import TourIndex from "../pages/users/tours/TourIndex";
import TourGroupList from "../pages/users/tours/TourGroupList";
import IdolIndex from "../pages/users/idols/IdolIndex";
import IdolDetail from "../pages/users/idols/IdolDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestGuard />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
      </Route>


      <Route path="/user" element={<AuthGuard role="user" />}>
        <Route element={<UserLayout />}>
          <Route path="idol-index" element={<IdolIndex />} />
          <Route path="idol/:id" element={<IdolDetail />} />
          <Route path="fan-index" element={<FanIndex />} />
          <Route path="tour-index" element={<TourIndex />} />
          <Route path="tour-group/:groupName" element={<TourGroupList />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
