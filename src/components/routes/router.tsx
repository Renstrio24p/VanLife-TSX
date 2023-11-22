import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const NotFound = lazy(() => import("../pages/NotFound"));
const Reviews = lazy(() => import("../pages/host/Reviews"));
const Income = lazy(() => import("../pages/host/Income"));
const Dashboard = lazy(() => import("../pages/host/Dashboard"));
import {loader as DashboardLoader } from "../pages/host/Dashboard";
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
import Login, {loader as LoginLoader, action as LoginAction} from "../pages/Login";
import { requireAuth } from "../../../auth/Utils";

const VanDetail = lazy(() => import('../pages/VanDetail'));

export const reactRoutes = createBrowserRouter([
  {
    // absolute path
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />,
        loader: LoginLoader,
        action: LoginAction
      },
      {
        path: 'about',
        element: <About />
      },
      {
        // vans path
        path: 'vans',
        children: [
            {
                index: true,
                element: <Vans />,
                errorElement: <Error />,
                loader: VansLoader
            },
            {
                path: ':id',
                element: <VanDetail />,
                errorElement: <Error />,
                loader: VanDetailLoader
            },
        ]
      },
      // host path
      {
        path: 'host',
        element: <HostLayout />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: DashboardLoader
          },
          {
            path: 'income',
            element: <Income />,
            loader: (async ({request}) => { await requireAuth({request}) })
          },
          {
            path: 'reviews',
            element: <Reviews />,
            loader: (async ({request}) => { await requireAuth({request}) })
          },
          {
            path: 'vans',
            children: [
              {
                index: true,
                element: <HostVans />,
                errorElement: <Error />,
                loader: HostVansLoader
              },
              {
                path: ':id',
                element: <HostVanDetail />,
                errorElement: <Error />,
                loader: HostVansDetailLoader,
                children : [
                  {
                    index: true,
                    element: <HostVanInfo />,
                    loader:(async ({request}) => await requireAuth({request}))
                  },
                  {
                    path: 'pricing',
                    element: <HostVanPricing />,
                    loader:(async ({request}) => await requireAuth({request}))

                  },
                  {
                    path: 'photos',
                    element: <HostVanPhotos />,
                    loader:(async ({request}) => await requireAuth({request}))

                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);