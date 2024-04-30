import React from 'react';
const Dashboard = React.lazy(() => import("../Pages/Dashboard/Dashboard"));
const Categories = React.lazy(() => import("../Pages/Category/Category"));
const Products = React.lazy(() => import("../Pages/Product/Products"));
const PageNotFound = React.lazy(() => import("../Components/System/PageNotFound"));

const PrivateRoutes = [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
]
export default PrivateRoutes;