import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      zIndex: 999,
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      background: "#000",
    }}
  >
    <Link
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={logo.src} alt={logo.alt} height={48} />
    </Link>
    <SearchBar />
  </Stack>
);

export default Navbar;
