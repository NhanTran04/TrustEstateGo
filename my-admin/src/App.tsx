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
  Person,
  PlaylistAddCheckSharp,
  PostAdd,
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

// 🌟 Custom Menu
const MyMenu = () => (
  <List sx={{ padding: 2 }}>
    <MenuItemLink
      to="/users"
      primaryText="Người dùng"
      leftIcon={<Person />}
      sx={{ mb: 2 }}
    />
    <MenuItemLink
      to="/categories"
      primaryText="Danh mục"
      leftIcon={<Category />}
      sx={{ mb: 2 }}
    />
    <MenuItemLink
      to="/packages"
      primaryText="Gói"
      leftIcon={<PlaylistAddCheckSharp />}
      sx={{ mb: 2 }}
    />
    <MenuItemLink
      to="/properties"
      primaryText="Bài đăng"
      leftIcon={<PostAdd />}
      sx={{ mb: 2 }}
    />
    <MenuItemLink
      to="/sellers"
      primaryText="Đánh giá"
      leftIcon={<Reviews />}
      sx={{ mb: 2 }}
    />
    <MenuItemLink
      to="/roles"
      primaryText="Vai trò"
      leftIcon={<RollerShades />}
      sx={{ mb: 2 }}
    />
    <MenuItemLink
      to="/permissions"
      primaryText="Quyền"
      leftIcon={<Security />}
      sx={{ mb: 2 }}
    />
  </List>
);

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
    layout={MyLayout} // dùng menu custom
  >
    <CustomRoutes>
      <Route path="/user-properties/:userId" element={<UserPropertiesList />} />
      <Route path="/sellers/:sellerId/reviews" element={<ReviewList />} />
      <Route
        path="/sellers/:sellerId/reviews/create"
        element={<ReviewCreate />}
      />
      <Route
        path="/sellers/:sellerId/reviews/:id/show"
        element={<ReviewShow />}
      />
    </CustomRoutes>

    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      show={UserShow}
      create={UserCreate}
      icon={Person}
      options={{ label: "Người dùng" }}
    />

    <Resource
      name="categories"
      list={CategoryList}
      edit={CategoryEdit}
      show={CategoryShow}
      create={CategoryCreate}
      icon={Category}
      options={{ label: "Danh mục" }}
    />
    <Resource
      name="packages"
      list={PackageList}
      edit={PackageEdit}
      show={PackageShow}
      create={PackageCreate}
      icon={PlaylistAddCheckSharp}
      options={{ label: "Gói" }}
    />
    <Resource
      name="properties"
      list={PropertyList}
      edit={PropertyEdit}
      create={PropertyCreate}
      show={PropertyShow}
      options={{ label: "Bài đăng" }}
      icon={PostAdd}
    />
    <Resource
      name="sellers"
      list={SellerList}
      options={{ label: "Đánh giá" }}
      icon={Reviews}
    />
    <Resource
      name="roles"
      list={RoleList}
      edit={RoleEdit}
      show={RoleShow}
      create={RoleCreate}
      options={{ label: "Vai trò" }}
      icon={RollerShades}
    />
    <Resource
      name="permissions"
      list={PermissionList}
      edit={PermissionEdit}
      create={PermissionCreate}
      options={{ label: "Quyền" }}
      icon={Security}
    />
  </Admin>
);
