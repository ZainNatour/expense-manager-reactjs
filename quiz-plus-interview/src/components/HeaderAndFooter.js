import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";

// Header
function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Expense Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

// Footer
const Footer = styled(Box)({
  position: "relative",
  width: "100%",
  textAlign: "center",
  padding: "16px",
});

function AppFooter() {
  return (
    <Footer>
      <Typography variant="body1">
        Your App © {new Date().getFullYear()}
      </Typography>
    </Footer>
  );
}

export { Header, AppFooter };
