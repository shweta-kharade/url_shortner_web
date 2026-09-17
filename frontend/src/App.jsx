// frontend/src/App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import MyLinks from "./pages/MyLinks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: "#2A2D35", color: "#F7F7F5", fontSize: "14px" },
          success: { iconTheme: { primary: "#22D3AA", secondary: "#2A2D35" } },
          error: { iconTheme: { primary: "#E5484D", secondary: "#2A2D35" } },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/my-links"
          element={
            <ProtectedRoute>
              <AppLayout>
                <MyLinks />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:shortCode"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardWrapper />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  return <Login onLoginSuccess={() => navigate("/")} />;
}

function RegisterPage() {
  const navigate = useNavigate();
  return <Register onRegisterSuccess={() => navigate("/")} />;
}

function DashboardWrapper() {
  const { shortCode } = useParams();
  return <Dashboard shortCode={shortCode} />;
}

export default App;
