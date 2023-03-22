import Album from "@/views/Album/Album";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";


const Home = lazy(() => import("@/views/Home/Home"))
const Recommend = lazy(() => import("@/views/Recommend/Recommend"));
const Rank = lazy(() => import("@/views/rank/Rank"));
const Singers = lazy(() => import("@/views/singers/Singers"))
const Singer = lazy(() => import("@/views/singer/singer"));
const Search = lazy(() => import('@/views/Search/Search'))
const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
        children: [{
            path: "/",
            element: <Navigate to="/recommend"></Navigate>
        }, {
            path: 'search',
            element: <Search />
        }, {
            path: 'recommend',
            element: <Recommend />,
            children: [{
                path: ":id",
                element: <Album />
            }]
        }, {
            path: 'rank',
            element: <Rank />,
            children: [{
                path: ":id",
                element: <Album />
            }]
        }, {
            path: "singers",
            element: <Singers />,
            children: [{
                path: ":id",
                element: <Singer />
            }]
        }]
    }
]

export default routes;