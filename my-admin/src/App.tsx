// src/App.tsx
import {
  Admin,
  CustomRoutes,
  Resource,
  Layout,
  MenuItemLink,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { createTheme, List } from "@mui/material";
import {
  Category,
  DashboardCustomize,
  Person,
  PlaylistAddCheckSharp,
  PostAdd,
  Report,
  Reviews,
  RollerShades,
  Security,
} from "@mui/icons-material";

import { CategoryList } from "./components/categories/CategoryList";
import { CategoryCreate } from "./components/categories/CategoryCreate";
import { CategoryShow } from "./components/categories/CategoryShow";
import { CategoryEdit } from "./components/categories/CategoryEdit";

import { PackageList } from "./components/packages/PackageList";
import { PackageEdit } from "./components/packages/PackageEdit";
import { PackageShow } from "./components/packages/PackageShow";
import { PackageCreate } from "./components/packages/PackageCreate";

import { PropertyList } from "./components/properties/PropertyList";
import { PropertyEdit } from "./components/properties/PropertyEdit";
import { PropertyCreate } from "./components/properties/PropertyCreate";
import { PropertyShow } from "./components/properties/PropertyShow";
import { UserPropertiesList } from "./components/properties/UserPropertiesList";

import { SellerList } from "./components/reviews/SellerList";
import { ReviewList } from "./components/reviews/ReviewList";
import { ReviewCreate } from "./components/reviews/ReviewCreate";
import { ReviewShow } from "./components/reviews/ReviewShow";

import { UserList } from "./components/users/UserList";
import { UserEdit } from "./components/users/UserEdit";
import { UserShow } from "./components/users/UserShow";
import { UserCreate } from "./components/users/UserCreate";

import { RoleEdit } from "./components/roles/RoleEdit";
import { RoleShow } from "./components/roles/RoleShow";
import { RoleCreate } from "./components/roles/RoleCreate";
import RoleList from "./components/roles/RoleList";

import { Route } from "react-router";
import { PermissionList } from "./components/permissions/PermissionList";
import { PermissionEdit } from "./components/permissions/PermissionEdit";
import { PermissionCreate } from "./components/permissions/PermissionCreate";
import { authProvider } from "./AuthProvider";
import LoginPage from "./LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import ReportList from "./components/report/ReportList";
import ReportEdit from "./components/report/ReportEdit";
import { usePermissions } from "react-admin";

const MyMenu = () => {
  const { permissions } = usePermissions(); // lấy roles từ authProvider
  const isAdmin = permissions?.includes("ADMIN");
  const isSTAFF = permissions?.includes("STAFF");

  return (
    <List sx={{ padding: 2 }}>
      {isAdmin && (
        <>
          <MenuItemLink to="/dashboard" primaryText="Dashboard" leftIcon={<DashboardCustomize />} sx={{ mb: 2 }} />
          <MenuItemLink to="/users" primaryText="Người dùng" leftIcon={<Person />} sx={{ mb: 2 }} />
          <MenuItemLink to="/categories" primaryText="Danh mục" leftIcon={<Category />} sx={{ mb: 2 }} />
          <MenuItemLink to="/packages" primaryText="Gói" leftIcon={<PlaylistAddCheckSharp />} sx={{ mb: 2 }} />
          <MenuItemLink to="/properties" primaryText="Bài đăng" leftIcon={<PostAdd />} sx={{ mb: 2 }} />
          <MenuItemLink to="/sellers" primaryText="Đánh giá" leftIcon={<Reviews />} sx={{ mb: 2 }} />
          <MenuItemLink to="/roles" primaryText="Vai trò" leftIcon={<RollerShades />} sx={{ mb: 2 }} />
          <MenuItemLink to="/permissions" primaryText="Quyền" leftIcon={<Security />} sx={{ mb: 2 }} />
        </>
      )}

      {isSTAFF && (
        <MenuItemLink to="/reports" primaryText="Khiếu nại" leftIcon={<Report />} sx={{ mb: 2 }} />
      )}
    </List>
  );
};

// 🌟 Custom Layout
const MyLayout = (props: any) => <Layout {...props} menu={MyMenu} />;

// 🌟 Theme
const theme = createTheme({
  palette: {
    primary: { main: "#487ff5ff" },
    secondary: { main: "#81b5ecff" },
    background: { default: "#e3eef9ff" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h6: { fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
      },
    },
  },
});

// 🌟 Main App
export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    loginPage={LoginPage}
    title="TrustEstate Admin"
    theme={theme}
    layout={MyLayout}
  >
    {(permissions) => (
      <>
        <CustomRoutes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-properties/:userId" element={<UserPropertiesList />} />
          <Route path="/sellers/:sellerId/reviews" element={<ReviewList />} />
          <Route path="/sellers/:sellerId/reviews/create" element={<ReviewCreate />} />
          <Route path="/sellers/:sellerId/reviews/:id/show" element={<ReviewShow />} />
        </CustomRoutes>

        {permissions?.includes("ADMIN") && (
          <>
            <Resource name="users" list={UserList} edit={UserEdit} show={UserShow} create={UserCreate} icon={Person} />
            <Resource name="categories" list={CategoryList} edit={CategoryEdit} show={CategoryShow} create={CategoryCreate} icon={Category} />
            <Resource name="packages" list={PackageList} edit={PackageEdit} show={PackageShow} create={PackageCreate} icon={PlaylistAddCheckSharp} />
            <Resource name="properties" list={PropertyList} edit={PropertyEdit} create={PropertyCreate} show={PropertyShow} icon={PostAdd} />
            <Resource name="sellers" list={SellerList} icon={Reviews} />
            <Resource name="roles" list={RoleList} edit={RoleEdit} show={RoleShow} create={RoleCreate} icon={RollerShades} />
            <Resource name="permissions" list={PermissionList} edit={PermissionEdit} create={PermissionCreate} icon={Security} />
          </>
        )}

        {permissions?.includes("STAFF") && (
          <Resource name="reports" list={ReportList} edit={ReportEdit} icon={Report} />
        )}
      </>
    )}
  </Admin>
);
