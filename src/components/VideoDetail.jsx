import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoData(data.items[0])
    );
  }, [id]);

  console.log(videoData);
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={2}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography p={3}>{videoData?.snippet?.title}</Typography>
            <Typography>
            Published on{" "}
            <Link color="primary" underline="none">
              {new Date(videoData?.snippet?.publishedAt).toDateString()}
            </Link>
              {videoData?.snippet?.channelTitle}
            </Typography>
            <Stack spacing={2} mt={4}>
              <Typography variant="caption">Views</Typography>
              <CheckCircle fontSize="small" color="success" />
              <Typography component="span" variant="body1">
                {new Intl.NumberFormat("en-US").format(
                  videoData?.statistics?.viewCount
                )}
              </Typography>
              <Box p={3}>
                <Typography variant="subtitle1"> Description</Typography>
                <Typography>{videoData?.snippet?.description}</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
