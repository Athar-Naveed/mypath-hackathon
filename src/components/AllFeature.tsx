import React from "react";
import {Box, Container} from "@mui/material";
import Image from "next/image";
import FadeInWhenVisible from "./Animation";
import {featureContent} from "../data/constants";

const AllFeature = () => {
  return (
    <Box sx={styles.container}>
      <Container maxWidth="lg">
        <Box>
          <div className="text-[14px] font-normal text-black dark:text-white tracking-[4px] uppercase leading-[20px] text-left font-promixa">
            {featureContent.featureTitle}
          </div>

          <div className="text-[48px] font-semibold text-black dark:text-white tracking-[-1px] leading-[58px] mt-3 text-left">
            {featureContent.mainHeading}
          </div>

          <Box sx={styles.subHeading} className="font-promixa">
            {featureContent.subHeading}
          </Box>
        </Box>

        {featureContent.feature.map((feature, index) => (
          <FadeInWhenVisible key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: {md: "center", xs: "start"},
                gap: 6,
                mt: 8,
                height: "100%",
                flexDirection: {
                  md: index % 2 === 0 ? "row" : "row-reverse",
                  xs: "column",
                },
              }}
            >
              <Box
                sx={{
                  width: {xs: "100%", md: "50%"},
                  height: "100%",
                }}
              >
                <Image
                  src={feature.img}
                  alt={feature.title}
                  className="imgHeight"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "12px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: {xs: "100%", md: "50%"},
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <Box
                  sx={{
                    fontSize: {md: "36px", xs: "32px"},
                    lineHeight: {md: "46px", xs: "42px"},
                    fontWeight: 600,
                    // color: "#7286FF",
                    color: "#1D68FF",
                  }}
                >
                  {feature.title}
                </Box>
                <Box
                  className="font-promixa"
                  sx={{
                    fontSize: "18px",
                    lineHeight: {md: "28px", xs: "26px"},
                    fontWeight: "400",
                    color: "gray",
                    mt: "20px",
                  }}
                >
                  {feature.description}
                </Box>
              </Box>
            </Box>
          </FadeInWhenVisible>
        ))}
      </Container>
    </Box>
  );
};

export default AllFeature;

const styles = {
  container: {
    marginTop: {xs: 12, sm: 15},
    px: "2px",
  },
  featureTitle: {
    color: "#000000",
    fontWeight: 400,
    fontSize: "14px",
    letterSpacing: "4px",
    textTransform: "uppercase",
    lineHeight: "20px",
    fontFamily: "var(--font-promixa)",
    textAlign: "left",
  },
  mainHeading: {
    fontSize: "48px",
    fontWeight: 600,
    color: "#000000",
    letterSpacing: "-1px",
    lineHeight: "58px",
    mt: 3,
    textAlign: "left",
  },
  subHeading: {
    fontSize: "20px",
    fontWeight: 300,
    color: "gray",
    textAlign: "left",
    fontFamily: "var(--font-promixa)",
    mt: 2,
  },
};
