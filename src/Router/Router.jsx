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
import Checkout from "../pages/CheckOutPage/Checkout";
import MyContactRequest from "../pages/Dashboard/MyContactRequest/MyContactRequest";
import ContactUs from "../pages/contactus/ContactUs";
import MyFavourites from "../pages/Dashboard/MyFavouriteBiodata/MyFavourites";
import ApprovedPremium from "../pages/Dashboard/ApprovedPrimium/ApprovedPremium";
import MakeAdmin from "../pages/Dashboard/MakeAnAdmin/MakeAdmin";
import ContactRequestTable from "../pages/Dashboard/ApprovedcontactRequest/ContactRequestTable";
import BiodataInsightsPieChart from "../pages/Dashboard/AdminDashboard/BiodataInsightsPiechart";
import GotMarried from "../pages/Dashboard/married/GotMarried";


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
                path:'/contact',
                Component:ContactUs
            },
            {
                path:'/biodata/:biodataId',
                element:<PrivateRoute><BiodataDetails/></PrivateRoute>,
            },
            {
                path: 'checkout/:biodataId',
                element:<PrivateRoute><Checkout></Checkout></PrivateRoute>,
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
            {
                path:'myContactRequests',
                Component:MyContactRequest,

               
            },
            {
                path:'myFavourites',
                Component:MyFavourites,
            },
            {
                path:'premiumBenefits',
                Component:ApprovedPremium,
            },
            {
                path:'adminPanel',
                Component:MakeAdmin
            },
            {
                path:'approvedContactRequests',
                Component:ContactRequestTable,
            },
            {
                path:'biodataInsights',
                Component:BiodataInsightsPieChart,

            },
            {
                path:'got-married',
                Component:GotMarried,

            }

        ]

    }
   
    
])