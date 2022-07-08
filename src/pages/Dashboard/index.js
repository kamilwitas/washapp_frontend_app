import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Layout, Breadcrumb } from "antd";

import HeaderPage from "../../components/HeaderPage";
import Sidebar from "../../components/Sidebar";

import ContentPage from "../ContentPage";
import AdaptionPage from "../AdaptionPage";
import ReleasePage from "../ReleasePage";
import CustomerPage from "../CustomerPage";
import CategoryPage from "../CategoryPage";
import AssortmentsPage from "../AssortmentsPage";
import UsersPage from "../UsersPage";
import LocationsPage from "../LocationsPage";
import { UserContext } from "../../context/userContext";

import "../../styles/App.less";
import "antd/dist/antd.less";
import { OrderContext } from "../../context/orderContext";

const Dashboard = () => {
  const [user, setUser] = useState("");
  //Order Provider
  const [activeLocation, setActiveLocation] = useState();
  const [activeCustomer, setActiveCustomer] = useState();
  //
  const location = useLocation();

  const errorPage = () => {
    return <span>Nie znaleziono określonej strony!</span>;
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
        <OrderContext.Provider value={{ activeLocation, setActiveLocation, activeCustomer, setActiveCustomer }}>
        <HeaderPage />
        <Layout className="dashboardContainer" >
          <Sidebar />
          <Layout className="site-layout">
            <Breadcrumb style={{ margin: "16px 0", paddingLeft: "1rem" }}>
              <Breadcrumb.Item>Home {location.pathname}</Breadcrumb.Item>
            </Breadcrumb>
            <Routes>
              <Route path="/" element={<ContentPage />} />
              <Route path="/dashboard" element={<ContentPage />} />
              <Route path="/adoption" element={<AdaptionPage />} />
              <Route path="/release" element={<ReleasePage />} />
              <Route path="/clients" element={<CustomerPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/assortment" element={<AssortmentsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route component={errorPage} />
            </Routes>
          </Layout>
        </Layout>
        </OrderContext.Provider>
    </UserContext.Provider>
  );
};

export default Dashboard;
