import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";

function Navbar() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      sx={{
        display: "flex",
        justifyContent: "space-around",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <BottomNavigationAction
        label="Manage Expenses"
        icon={<ListIcon />}
        component={RouterLink}
        to="/manage"
      />
      <BottomNavigationAction
        label="Expenses Analysis"
        icon={<BarChartIcon />}
        component={RouterLink}
        to="/analyze"
      />
    </BottomNavigation>
  );
}

export default Navbar;
