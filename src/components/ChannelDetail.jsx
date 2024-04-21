import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

import { RemoveRedEye } from "@mui/icons-material";

const ChannelDetail = () => {
  const [ChannelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelData(data?.items);
      console.table(data);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  console.log("Channel Data", ChannelData);

  return (
    <Box minHeight="92vh">
      <Box
        sx={{
          position: "absolute",
          zIndex: "1",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(2,0,36,1) 9%, rgba(9,9,121,1) 49%, rgba(0,129,255,1) 78%)",
            height: "300px",
          }}
        />
      </Box>
      <Box>
        {ChannelData ? <ChannelCard channelDetail={ChannelData} /> : null}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            color: "white",
            textAlign: "center",
          }}
        >
          About
          <p>{ChannelData?.snippet?.description}</p>
          <h3
            style={{
              fontFamily: "math",
              letterSpacing: ".03em",
              lineHeight: "1.5",
              fontWeight: "bold",
            }}
          >
            {parseInt(ChannelData?.statistics?.viewCount).toLocaleString()}
            <RemoveRedEye sx={{ ml: "5px", fontSize: 15 }} />
          </h3>
          <br />
          <h2
            style={{
              fontFamily: "Poppins",
              textAlign: "center",
              letterSpacing: ".03em",
              lineHeight: "1.5",
              fontWeight: "bold",
            }}
          >
            {ChannelData?.snippet?.title} Videos
          </h2>
        </Box>
        <Videos title="Related Videos" videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
