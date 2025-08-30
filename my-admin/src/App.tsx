import {
  Admin,
  Resource,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { CategoryList } from "./components/categories/CategoryList";
import { CategoryCreate } from "./components/categories/CategoryCreate";
import { CategoryShow } from "./components/categories/CategoryShow";
import { CategoryEdit } from "./components/categories/CategoryEdit";
import { createTheme } from "@mui/material";
import { deepPurple, grey, pink } from "@mui/material/colors";
import { Category } from "@mui/icons-material";
import { PackageList } from "./components/packages/PackageList";
import { PackageEdit } from "./components/packages/PackageEdit";
import { PackageShow } from "./components/packages/PackageShow";
import { PackageCreate } from "./components/packages/PackageCreate";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[600],
    },
    secondary: {
      main: pink[500],
    },
    background: {
      default: grey[50],
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});



export const App = () => (
  <Admin dataProvider={dataProvider} title="TrustEstate Admin"
    theme={theme}>
    {/* <Resource
      name="users"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    /> */}
    <Resource
      name="categories"
      list={CategoryList}
      edit={CategoryEdit}
      show={CategoryShow}
      create={CategoryCreate}
      icon={Category}
      options={{ label: 'Danh mục' }}
    />
    {<Resource
      name="packages"
      list={PackageList}
      edit={PackageEdit}
      show={PackageShow}
      create={PackageCreate}
      options={{ label: 'Gói' }}
    />
    /*<Resource
      name="payments"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="permissions"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="properties"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="roles"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    /> */}
  </Admin>
);
