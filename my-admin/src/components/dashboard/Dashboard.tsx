import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import RevenueChart from "./RevenueChart";

interface RevenueResponse {
  period: number;
  total: number;
}

const Dashboard = () => {
  const [monthly, setMonthly] = useState<RevenueResponse[]>([]);
  const [quarterly, setQuarterly] = useState<RevenueResponse[]>([]);
  const [yearly, setYearly] = useState<RevenueResponse[]>([]);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const apiUrl = import.meta.env.VITE_SIMPLE_REST_URL + "/revenue";

  const loadData = (year: number) => {
    const token = localStorage.getItem("token") || "";
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${apiUrl}/month/${year}`, { headers }).then((res) => res.json()),
      fetch(`${apiUrl}/quarter/${year}`, { headers }).then((res) => res.json()),
      fetch(`${apiUrl}/year/${year}`, { headers }).then((res) => res.json()),
    ]).then(([monthData, quarterData, yearData]) => {
      setMonthly(monthData);
      setQuarterly(quarterData);
      setYearly(yearData);
    });
  };

  useEffect(() => {
    loadData(selectedYear);
  }, [selectedYear]);

  const years = Array.from({ length: 3 }, (_, i) => new Date().getFullYear() - i);

  return (
    <Card>
      <CardContent>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">Thống kê doanh thu</Typography>

          <FormControl size="small" style={{ minWidth: 120 }}>
            <InputLabel>Năm</InputLabel>
            <Select
              value={selectedYear}
              label="Năm"
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Dòng 2: Chart tháng + quý */}
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <div style={{ flex: 1 }}>
            <RevenueChart
              title={`Doanh thu theo tháng (${selectedYear})`}
              data={monthly}
              label="Tháng"
            />
          </div>
          <div style={{ flex: 1 }}>
            <RevenueChart
              title={`Doanh thu theo quý (${selectedYear})`}
              data={quarterly}
              label="Quý"
            />
          </div>
        </div>

        {/* Dòng 3: Chart năm căn giữa */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <div style={{ width: "600px" }}>
            <RevenueChart
              title={`Doanh thu theo năm (${selectedYear})`}
              data={yearly}
              label="Năm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
