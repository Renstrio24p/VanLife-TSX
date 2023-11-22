import { lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const NotFound = lazy(() => import("../pages/NotFound"));
const Reviews = lazy(() => import("../pages/host/Reviews"));
const Income = lazy(() => import("../pages/host/Income"));
const Dashboard = lazy(() => import("../pages/host/Dashboard"));
const HostVans = lazy(() => import("../pages/host/HostVans"));
import { loader as HostVansLoader } from "../pages/host/HostVans";
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
import Login, { loader as LoginLoader } from "../pages/Login";
import { requireAuth } from "../../../auth/Utils";
import { loader as DashboardLoader} from "../pages/host/Dashboard";

const VanDetail = lazy(() => import('../pages/VanDetail'));

export const reactRoutes = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route
      path="login"
      element={<Login />}
      loader={LoginLoader}
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
  
    <Route path="host" element={<HostLayout />}>
      <Route
        index
        element={<Dashboard />}
        loader={DashboardLoader}
      />
      <Route
        path="income"
        element={<Income />}
        loader={async ({request}) => await requireAuth({request})}
      />
      <Route
        path="reviews"
        element={<Reviews />}
        loader={async ({request}) => await requireAuth({request})}
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
          loader={async ({request}) => await requireAuth({request})}
        />
        <Route
          path="pricing"
          element={<HostVanPricing />}
          loader={async ({request}) => await requireAuth({request})}
        />
        <Route
          path="photos"
          element={<HostVanPhotos />}
          loader={async ({request}) => await requireAuth({request})}
        />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
))

createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: LoginLoader
      },
      {
        path: 'vans',
        element: <Vans />,
        errorElement: <Error />,
        loader: VansLoader,
        children: [
          {
            path: ':id',
            element: <VanDetail />,
            loader: VanDetailLoader
          }
        ]
      },
    
    ]
  }
])