import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../Theme";
import SecurityIcon from "@mui/icons-material/Security";

export default function RightSideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      style={{
        width: "23vw",
        margin: "15px",
        position: "absolute",
        right: "8vh",
        top: "72px",
      }}
    >
      <CardContent
        sx={{
          background: `${colors.primary[400]}`,
          marginBottom: 4,
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ display: "flex" }}
        >
          <SecurityIcon sx={{ color: "red" }} />
          <span style={{ marginLeft: "5px" }}>Reddit Premium</span>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginLeft: "15px" }}
        >
          The best Reddit experience, with monthly Coins
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: "7px", borderRadius: "25px", width: "100%" }}
        >
          Join Reddit Premium
        </Button>
      </CardContent>
      <CardContent
        sx={{
          background: `${colors.primary[400]}`,
          marginBottom: 4,
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          <img
            src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png"
            alt="background"
            style={{ position: "absolute", maxWidth: "20.5vw" }}
          />
          <img
            src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
            height={"65vh"}
            alt="reddit-mascot"
            style={{ zIndex: 10, position: "relative", top: 15 }}
          />
          Home
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ marginTop: 1.5 }}
        >
          Your personal Reddit front page. Come here to check in with your
          favorite communities.
        </Typography>
        <hr></hr>
        <Button
          variant="contained"
          sx={{
            marginTop: "7px",
            borderRadius: "25px",
            width: "100%",
            backgroundColor: `${colors.blueAccent[600]}`,
          }}
        >
          Join Reddit Premium
        </Button>
        <Button
          variant="outlined"
          sx={{
            marginTop: "7px",
            borderRadius: "25px",
            width: "100%",
            color: `${theme.palette.mode === "dark" ? "white" : "black"}`,
          }}
        >
          Create Community
        </Button>
      </CardContent>
      <CardContent
        sx={{
          background: `${colors.primary[400]}`,
          marginBottom: 4,
          position: "sticky",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px",
            }}
          >
            <span>User Agreement</span>
            <span>Content Policy</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px",
            }}
          >
            <span>Privacy Policy</span>
            <span>Moderator Code of Conduct</span>
          </div>
          <hr></hr>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px",
            }}
          >
            <span>English</span>
            <span>Deutsch</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px",
            }}
          >
            <span>Français</span>
            <span>Español</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2px",
            }}
          >
            <span>Italiano</span>
            <span>Português</span>
          </div>
          <hr></hr>
          <span>Reddit Inc © 2023. All rights reserved</span>
        </Typography>
      </CardContent>
    </div>
  );
}
