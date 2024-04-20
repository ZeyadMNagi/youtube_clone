import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { People } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { demoProfilePicture, demoChannelTitle } from "../utils/constants";

const ChannelCard = ({ channelDetail }) => {
  console.log(channelDetail);
  const subCount = channelDetail?.statistics?.subscriberCount;
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20x",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "350px", md: "320px" },
        height: "326px",
        margin: "auto",
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            component="img"
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetail?.snippet?.title}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              objectFit: "cover",
              border: "3px solid #FFD700",
            }}
          />

          <Typography variant="h5" color="#fff" fontWeight="bold">
            <Link
              to={`/channel/${channelDetail?.id?.channelId}`}
              style={{ color: "#fff" }}
            >
              {channelDetail?.snippet?.title || demoChannelTitle}
              <CheckCircle
                color="success"
                sx={{ ml: "5px", fontSize: 15 }}
              />{" "}
            </Link>
          </Typography>
          {/* Subscribers */}
          {subCount && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <People sx={{ mr: 0.5 }} fontSize="small" />
              <Typography variant="body2">
                {parseInt(subCount).toLocaleString}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
