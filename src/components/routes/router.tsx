import { lazy } from "react";
import {createBrowserRouter} from "react-router-dom";
import { loader as VanLoader} from "../pages/Vans";
import { loader as VanDetailsLoader } from "../pages/VanDetail";
import { requireAuth } from "../../../auth/Utils";

const NotFound = lazy(()=> import("../pages/NotFound"));
const Reviews = lazy(()=> import("../pages/host/Reviews"));
const Income = lazy(()=> import("../pages/host/Income"));
const Dashboard = lazy(()=> import("../pages/host/Dashboard"));
const HostVans = lazy (()=> import("../pages/host/HostVans"));
const HostVanDetails = lazy(()=> import("../pages/host/HostVanDetails"));
const HostVanPricing = lazy(()=> import("../pages/host/HostVanPricing"));
const HostVanPhotos = lazy(()=> import("../pages/host/HostVanPhotos"));
const HostVanInfo = lazy(()=> import("../pages/host/HostVanInfo"));

const Layout = lazy(() => import('../layouts/Layout'))
const HostLayout = lazy(() => import('../layouts/HostLayout'))
const About = lazy(() => import('../pages/About'))
const Home = lazy(() => import('../pages/Home'))
const Vans = lazy(() => import('../pages/Vans'))
const VanDetail = lazy(() => import('../pages/VanDetail'))

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
                loader: VanLoader
            },
            {
                path: ':id',
                element: <VanDetail />,
                loader: VanDetailsLoader
            },
        ]
      },
      // host path
      {
        path: 'host',
        element: <HostLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: (async () => { await requireAuth() })
          },
          {
            path: 'income',
            element: <Income />
          },
          {
            path: 'reviews',
            element: <Reviews />
          },
          {
            path: 'vans',
            children: [
              {
                index: true,
                element: <HostVans />
              },
              {
                path: ':id',
                element: <HostVanDetails />,
                children : [
                  {
                    index: true,
                    element: <HostVanInfo />
                  },
                  {
                    path: 'pricing',
                    element: <HostVanPricing />
                  },
                  {
                    path: 'photos',
                    element: <HostVanPhotos />
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