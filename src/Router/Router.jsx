import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import EditBioData from "../pages/Dashboard/BiodataForm/editBiodata";
import AboutUs from "../pages/AboutUs/AboutUs";
import BioDatas from "../pages/Biodatas/BioDatas";
import ViewBioData from "../pages/Dashboard/ViewBioData/ViewBioData";
import BiodataDetails from "../pages/BiodataDetails/BiodataDetails";


export const router = createBrowserRouter([
    {
        path: "/",
       Component:RootLayout,
        children:[
            {
                index:true,
                Component:Home,
            },
            {
                path:'/about',
                Component:AboutUs,
            },
            {
                path:'/biodatas',
                Component:BioDatas,
            },
            {
                path:'/biodata/:biodataId',
                element:<PrivateRoute><BiodataDetails/></PrivateRoute>,
            }
        ]
    },

    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:'/login',
                Component:Login,
            },
            {
                path:'/register',
                Component:Register,
            }
          
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children:[
            {
                path:'bioData',
                Component:EditBioData,
            },
            {
                path:'viewBiodata',
                Component:ViewBioData,

            },

        ]

    }
   
    
])