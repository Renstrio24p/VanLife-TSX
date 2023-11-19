import { lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const NotFound = lazy(() => import("../pages/NotFound"));
const Reviews = lazy(() => import("../pages/host/Reviews"));
const Income = lazy(() => import("../pages/host/Income"));
const Dashboard = lazy(() => import("../pages/host/Dashboard"));
const HostVans = lazy(() => import("../pages/host/HostVans"));
import { loader as HostVansLoader } from "../pages/host/HostVans";
const HostVanDetails = lazy(() => import("../pages/host/HostVanDetails"));
import HostVanDetail, { loader as HostVansDetailLoader } from "../pages/host/HostVanDetails";
const HostVanPricing = lazy(() => import("../pages/host/HostVanPricing"));
const HostVanPhotos = lazy(() => import("../pages/host/HostVanPhotos"));
const HostVanInfo = lazy(() => import("../pages/host/HostVanInfo"));

const Layout = lazy(() => import('../layouts/Layout'));
const HostLayout = lazy(() => import('../layouts/HostLayout'));
const About = lazy(() => import('../pages/About'));
const Home = lazy(() => import('../pages/Home'));
const Vans = lazy(() => import('../pages/Vans'));
import { loader as VansLoader } from "../pages/Vans";
import { loader as VanDetailLoader } from "../pages/VanDetail";
import Error from "../pages/Error";
import Login from "../pages/Login";
import { requireAuth } from "../../../auth/Utils";

const VanDetail = lazy(() => import('../pages/VanDetail'));

export const reactRoutes = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route
      path="login"
      element={<Login />}
    />
    <Route
      path="vans"
      element={<Vans />}
      errorElement={<Error />}
      loader={VansLoader}
    />
    <Route 
      path="vans/:id" 
      element={<VanDetail />} 
      loader={VanDetailLoader}
    />
    {/**
     * Challenge:
     * Include the `await requireAuth()` everywhere it's needed!
     */}

    <Route path="host" element={<HostLayout />}>
      <Route
        index
        element={<Dashboard />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="income"
        element={<Income />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="reviews"
        element={<Reviews />}
        loader={async () => await requireAuth()}
      />
      <Route
        path="vans"
        element={<HostVans />}
        loader={HostVansLoader}
      />
      <Route
        path="vans/:id"
        element={<HostVanDetail />}
        loader={HostVansDetailLoader}
      >
        <Route
          index
          element={<HostVanInfo />}
          loader={async () => await requireAuth()}
        />
        <Route
          path="pricing"
          element={<HostVanPricing />}
          loader={async () => await requireAuth()}
        />
        <Route
          path="photos"
          element={<HostVanPhotos />}
          loader={async () => await requireAuth()}
        />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
))
