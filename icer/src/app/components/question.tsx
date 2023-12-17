"use client";
/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardMedia, Paper } from "@mui/material";
import Image from "next/image";
import { formatGetDiscussionItem } from "../func/api";
import styles from "./question.module.css";

export const QuestionCard = (props: {
  name: string;
  content: formatGetDiscussionItem | null;
}) => {
  return (
    <>
      <Box
        component="div"
        display="fixed"
        // justifyContent="center"
        // alignItems="center"
        sx={{
          height: "500px",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const data = `/pengin/pen${index}.png`;
          return (
            <>
              <img
                className={`${styles["img-position"]} ${
                  props.content !== null &&
                  props.content?.isee_level != index &&
                  styles["fadeIn"]
                }`}
                width="350px"
                src={data}
                alt="logo"
              />
            </>
          );
        })}
      </Box>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minWidth: 275, background: "rgba(255,255,255,0)" }}
        mb={3}
      >
        <Card
          sx={{ maxWidth: 345, minWidth: 275, background: "rgba(255,255,255)" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {props.content?.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Typography
              textAlign="right"
              sx={{
                marginRight: 0,
                paddingRight: "15px",
                width: "100%",
                color: "rgba(0,0,0,0.5)",
              }}
            >
              {props.name}
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
