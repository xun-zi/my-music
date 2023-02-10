import Album from "@/views/Album/Album";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";


const Home = lazy(() => import("@/views/Home/Home"))
const Recommend = lazy(() => import("@/views/Recommend/Recommend"));
const Rank = lazy(() => import("@/views/rank/Rank"));
const Singers = lazy(() => import("@/views/singers/Singers"))
const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
        children: [{
            path:"/",
            element:<Navigate to="/recommend"></Navigate>
        }, {
            path: 'recommend',
            element: <Recommend />,
            children:[{
                path:":id",
                element:<Album/>
            }]
        }, {
            path: 'rank',
            element: <Rank />
        }, {
            path: "singers",
            element: <Singers />
        }]
    }
]

export default routes;