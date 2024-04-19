import { Stack } from "@mui/material";
import { Link } from "@mui/icons-material";

import { logo } from "../utils/constants";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      bgcolor: "white",
      zIndex: 1,
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="Logo" height={48} />
    </Link>
  </Stack>
);

export default Navbar;
