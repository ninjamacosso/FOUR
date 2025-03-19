import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/components/home";
import AuthPage from "@/components/auth/AuthPage";
import UserProfile from "@/components/profile/UserProfile";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Loader from "@/components/ui/loader";
import ErrorBoundary from "@/components/ui/error-boundary";

// Protected route component
const ProtectedRouteComponent = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/"
            element={
              <ProtectedRouteComponent>
                <Home />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteComponent>
                <UserProfile />
              </ProtectedRouteComponent>
            }
          />
          {/* Rotas de RH */}
          {[
            { path: "/hr", Component: dynamic.HrPage },
            { path: "/hr/dashboard", Component: dynamic.HrDashboard },
            { path: "/hr/employees", Component: dynamic.EmployeesPage },
            { path: "/hr/payroll", Component: dynamic.PayrollPage },
            { path: "/hr/timeattendance", Component: dynamic.TimeAttendancePage },
          ].map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <ErrorBoundary fallback={<div>Erro ao carregar página</div>}>
                    <React.Suspense fallback={<Loader />}>
                      <Component />
                    </React.Suspense>
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

// Carregamento dinâmico dos componentes
const dynamic = {
  HrPage: React.lazy(() => import('@/app/hr/page')),
  HrDashboard: React.lazy(() => import('@/app/hr/dashboard/page')),
  EmployeesPage: React.lazy(() => import('@/app/hr/employees/page')),
  PayrollPage: React.lazy(() => import('@/app/hr/payroll/page')),
  TimeAttendancePage: React.lazy(() => import('@/app/hr/timeattendance/page')),
};

export default AppRoutes;
