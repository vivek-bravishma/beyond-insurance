import React from "react";
import Navbar from "../components/Navbar/Main";
import Footer from "../components/Footer/Main";
import Home from "../components/Home/Main";
import Home2 from "../components/Home2/Main";
import Team from "../components/About/Team/Main";
import TeamDetails from "../components/About/TeamDetails/Main";
import Service from "../components/Services/Service/Main";
import ServiceDetails from "../components/Services/ServiceDetails/Main";
import NewsMain from "../components/News/NewsMain/Main";
import NewsDetails from "../components/News/NewsDetails/Main";
import Work from "../components/Pages/Work/Main";
import LoanCalculator from "../components/Pages/LoanCalculator/Main";
import CreditCard from "../components/Credit/CreditCard/Main";
import CreditCardDetails from "../components/Credit/CreditCardDetails/Main";
import FAQ from "../components/Pages/FAQ/Main";
import Testimonials from "../components/Pages/Testimonial/Main";
import Contact from "../components/Contact/Main";
import Login from "../components/LoginForm/Login";
import Home3 from "../components/Home3/Main";
import CreditCardForm from "../components/Credit/CreditForm/CreditCardForm";
import secureLocalStorage from "react-secure-storage";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/credit-card",
    element: <CreditCard />,
  },
  {
    path: "/home-02",
    element: <Home2 />,
  },
  {
    path: "/credit-card-details",
    element: <CreditCardDetails />,
  },
  {
    path: "/creditcardform",
    element: <CreditCardForm />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/team-details",
    element: <TeamDetails />,
  },
  {
    path: "/service",
    element: <Service />,
  },
  {
    path: "/service-details",
    element: <ServiceDetails />,
  },
  {
    path: "/news-main",
    element: <NewsMain />,
  },
  {
    path: "/news-details",
    element: <NewsDetails />,
  },
  {
    path: "/work",
    element: <Work />,
  },
  {
    path: "/loan-calculator",
    element: <PrivateRoute element={<LoanCalculator />} />,
  },
  {
    path: "/faqs",
    element: <PrivateRoute element={<FAQ />} />,
  },
  {
    path: "/testimonial",
    element: <PrivateRoute element={<Testimonials />} />,
  },
  {
    path: "/Home3",
    element: (
      <>
        {" "}
        <Navbar />
        <Home3 />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  // Add more routes here...
];

export default routes;
