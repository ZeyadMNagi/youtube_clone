import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Typography,
  Box,
  Stack,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { fetchFromAPI } from "../utils/fetchFromAPI";

import {
  demoVideoTitle,
  demoChannelTitle,
  demoVideoDescription,
} from "../utils/constants";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    // Fetch details of the current video
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoData(data.items[0])
    );

    // Fetch related videos
    fetchFromAPI(
      `search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=3`
    ).then((data) => setRelatedVideos(data.items));
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Box minHeight="95vh" overflow="auto">
      <Box p={2}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Box flex={2}>
            <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
              />
              <Typography variant="h4" mb={2}>
                {videoData?.snippet?.title || demoVideoTitle}
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Published on{" "}
                <Link color="primary" underline="none">
                  {new Date(videoData?.snippet?.publishedAt).toDateString() ||
                    `Date is not set`}
                </Link>{" "}
                by {videoData?.snippet?.channelTitle || demoChannelTitle}
              </Typography>
              <Stack spacing={2} mb={4}>
                <Typography variant="subtitle2">Views</Typography>
                <Typography variant="body1">
                  <CheckCircle fontSize="small" color="success" />
                  {new Intl.NumberFormat("en-US").format(
                    videoData?.statistics?.viewCount
                  ) || "1,000,000"}
                </Typography>
                <Box>
                  <Typography variant="subtitle2">Description</Typography>
                  <Typography>
                    {showFullDescription
                      ? videoData?.snippet?.description
                      : videoData?.snippet?.description.slice(0, 200) ||
                        showFullDescription
                      ? demoVideoDescription
                      : demoVideoDescription.slice(0, 200)}
                  </Typography>
                  {videoData?.snippet?.description.length > 200 && (
                    <Button onClick={toggleDescription}>
                      {showFullDescription ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </Box>
              </Stack>
            </Box>
          </Box>
          {/* Related Videos */}
          <Box flex={1}>
            <Typography variant="h5" mb={2}>
              Related Videos
            </Typography>
            <Grid container spacing={2}>
              {relatedVideos ? (
                relatedVideos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
                    <Card sx={{ maxWidth: 300 }}>
                      <CardActionArea
                        component={Link}
                        to={`/video/${video.id.videoId}`}
                      >
                        <img
                          src={video.snippet.thumbnails.medium.url}
                          alt={video.snippet.title}
                          style={{ width: "100%" }}
                        />
                        <CardContent>
                          <Typography variant="subtitle2" noWrap>
                            {video.snippet.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography>Loading...</Typography>
              )}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default VideoDetail;
