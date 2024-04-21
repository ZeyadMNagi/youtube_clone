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
  Divider,
} from "@mui/material";
import { CheckCircle, ThumbUp } from "@mui/icons-material";

import { fetchFromAPI } from "../utils/fetchFromAPI";

import { demoVideoTitle, demoChannelTitle } from "../utils/constants";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch details of the current video
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoData(data.items[0])
    );

    // Fetch related videos
    fetchFromAPI(
      `search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=3`
    ).then((data) => setRelatedVideos(data.items));

    // Fetch  comments for the video
    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=25`)
      .then((response) => response.items)
      .then((data) => {
        setComments(data);
        console.log(data);
      })
      .catch((error) => console.log("Error:", error));
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  console.log("Video Data: ", videoData);
  console.log("Related Videos: ", relatedVideos);
  console.log("Comments: ", comments);

  return (
    <Box minHeight="95vh" overflow="auto" >
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
              <Typography color="#fff" variant="subtitle1" mb={2}>
                Published on{" "}
                <Link underline="none" className="date">
                  {new Date(videoData?.snippet?.publishedAt).toDateString() ||
                    `Date is not set`}
                </Link>{" "}
                by
                <Link
                  to={`/channel/${videoData?.snippet?.channelId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="channelName"
                >
                  {videoData?.snippet?.channelTitle || demoChannelTitle}
                  <CheckCircle fontSize="small" color="success" />
                </Link>
              </Typography>
              <Stack spacing={2} mb={4}>
                Views:{" "}
                {new Intl.NumberFormat("en-US").format(
                  videoData?.statistics?.viewCount
                ) || "1,000,000"}
                <br />
                <ThumbUp />{" "}
                {new Intl.NumberFormat().format(
                  videoData?.statistics?.likeCount
                )}
                <Box>
                  <Typography variant="subtitle2">Description</Typography>
                  <Typography>
                    {showFullDescription
                      ? videoData?.snippet?.description
                      : videoData?.snippet?.description.slice(0, 200) + "..."}
                  </Typography>
                  {videoData?.snippet?.description.length > 200 && (
                    <Button onClick={toggleDescription}>
                      {showFullDescription ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </Box>
                <Typography variant="subtitle2">Comments</Typography>
                {comments
                  ? comments.map((comment) => (
                      <Box
                        key={id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <img
                          src={
                            comment?.snippet?.topLevelComment?.snippet
                              ?.authorProfileImageUrl
                          }
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            marginRight: 8,
                          }}
                          alt=""
                        />
                        <strong>
                          {
                            comment?.snippet?.topLevelComment?.snippet
                              ?.authorDisplayName
                          }
                          :{" "}
                        </strong>
                        {
                          comment?.snippet?.topLevelComment?.snippet
                            ?.textOriginal
                        }
                      </Box>
                    ))
                  : "No comments yet"}
                <Divider sx={{ my: 3 }} />
              </Stack>
            </Box>
          </Box>
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
