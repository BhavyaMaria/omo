import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useTheme } from "@context/ThemeContext";
import { useAuth } from "@context/AuthContext";
import Splash from "@screens/Splash";
import Home from "@screens/Home";
import MapScreen from "@screens/Map";
import Passkey from "@screens/Passkey";
import AI from "@screens/AI";
import Layout from "@components/layout/Layout";
import AuthPhone from "@screens/AuthPhone";
import AuthPhoneVerify from "@screens/AuthPhoneVerify";
import AuthEmail from "@screens/AuthEmail";
import AuthEmailVerify from "@screens/AuthEmailVerify";
import ProfileSetup from "@screens/ProfileSetup";
import Permissions from "@screens/Permissions";
import RideBooking from "@screens/RideBooking";
import Profile from "@screens/Profile";
import History from "@screens/History";
import ChildMode from "@screens/ChildMode";
import {
  getString,
  storageKeys
} from "@services/localStorageService";

const InitialRouteDecider = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const passkeyEnabled =
      getString(storageKeys.PASSKEY_ENABLED_KEY) === "true";
    const unlocked = sessionStorage.getItem("omo_passkey_unlocked_session") === "true";
    const locationPermission = getString(storageKeys.LOCATION_PERMISSION_KEY);

    if (!user) {
      navigate("/auth-phone", { replace: true });
      return;
    }

    if (!user.avatar) {
      navigate("/profile-setup", { replace: true });
      return;
    }

    if (passkeyEnabled && !unlocked) {
      navigate("/passkey-unlock", { replace: true });
      return;
    }

    if (!passkeyEnabled) {
      navigate("/passkey-setup", { replace: true });
      return;
    }

    if (!locationPermission) {
      navigate("/permissions", { replace: true });
      return;
    }

    navigate("/home", { replace: true });
  }, [navigate, user]);

  return null;
};

const AppShell = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.background,
        color: theme.text,
        transition: "background-color 0.3s ease, color 0.3s ease"
      }}
    >
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/" element={<InitialRouteDecider />} />
        <Route path="/auth-phone" element={<AuthPhone />} />
        <Route path="/auth-phone-verify" element={<AuthPhoneVerify />} />
        <Route path="/auth-email" element={<AuthEmail />} />
        <Route path="/auth-email-verify" element={<AuthEmailVerify />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/passkey-setup" element={<Passkey />} />
        <Route path="/passkey-unlock" element={<Passkey />} />
        <Route path="/permissions" element={<Permissions />} />

        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/ride"
          element={
            <Layout>
              <RideBooking />
            </Layout>
          }
        />
        <Route
          path="/map"
          element={
            <Layout>
              <MapScreen />
            </Layout>
          }
        />
        <Route
          path="/ai"
          element={
            <Layout>
              <AI />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/history"
          element={
            <Layout>
              <History />
            </Layout>
          }
        />
        <Route
          path="/child"
          element={
            <Layout>
              <ChildMode />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return <AppShell />;
};

export default App;
