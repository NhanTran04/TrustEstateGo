import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useRecordContext } from "react-admin";

interface BreadcrumbTitleProps {
  base: string;
  basePath: string;
  source?: string;
}

const BreadcrumbTitle: React.FC<BreadcrumbTitleProps> = ({ base, basePath, source = "name" }) => {
  const record = useRecordContext<any>();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        href={basePath}
        sx={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        {base}
      </Link>
      <Typography
        sx={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        {record?.[source]}
      </Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbTitle;
