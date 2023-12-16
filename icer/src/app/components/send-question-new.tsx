"use client";
/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  FormControl,
  Grid,
  Grow,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { Send, Menu, Search } from "@mui/icons-material";
import {
  parentDiscussionIdAtom,
  sendAnsQuestionDialogAtom,
  sendQuestionDialogAtom,
  userNameAtom,
} from "../recoil/atom";
import { useRecoilState } from "recoil";
import { postCreateDiscussion } from "../func/api";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

export default function SendQuestionDialog() {
  const [textForm, setTextForm] = React.useState("");
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [openSendQuestionDialog, setOpenopenSendQuestionDialog] =
    useRecoilState(sendQuestionDialogAtom);
  const [discussionId, setDiscussionId] = useRecoilState(
    parentDiscussionIdAtom
  );
  const [sendAnsQuestionDialog, setsendAnsQuestionDialog] = useRecoilState(
    sendAnsQuestionDialogAtom
  );

  const handleClickOpen = () => {
    setOpenopenSendQuestionDialog(true);
  };

  const handleClose = () => {
    setOpenopenSendQuestionDialog(false);
  };
  const handleSend = async () => {
    if (userName !== null) {
      const sendReaponse = await postCreateDiscussion({
        user_id: userName,
        content: textForm,
      });
      setDiscussionId(sendReaponse);
      handleClose();
      setsendAnsQuestionDialog(true);
    }
  };
  return (
    <React.Fragment>
      {/* <Fab
        onClick={handleClickOpen}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        color="primary"
        aria-label="add"
      >
        <CloseIcon />
      </Fab> */}
      <Box
        component="div"
        px={1}
        sx={{
          position: "fixed",
          bottom: 10,
          width: "100%",
        }}
      >
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ minWidth: 275, background: "rgba(255,255,255,0)" }}
          my={2}
        >
          {/* 送信フォーム */}
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: 400,
              // boxShadow: 3,
            }}
          >
            {/* <TextField
              sx={{
                margin: "10px 5px 10px 5px",
                width: "50%",
                minWidth: "58%",
                height: "auto",
                paddingRight: "0px",
              }}
              id="content"
              label="回答を書く"
              multiline
              minRows={1}
              maxRows={6}
              variant="filled"
              value={textForm}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTextForm(event.target.value);
              }}
            /> */}
            <Button
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                // paddingRight: "10px",
                width: "100%",
                maxWidth: 345,
                minWidth: 275,
                height: "70px",
                borderRadius: "30px",
                fontSize: "30px",
                backgroundImage: "url(/back.png)",
                backgroundSize: "cover",
                textShadow: "#3558AE 1px 0 10px;",
              }}
              onClick={handleClickOpen}
              variant="contained"
              // startIcon={<TipsAndUpdatesIcon />}
            >
              <ruby>
                凍稿<rt>トウコウ</rt>する
              </ruby>
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        fullScreen
        open={openSendQuestionDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          component="div"
          sx={{ backgroundImage: "linear-gradient(#00a3ff, #ffffff);" }}
        >
          <Fab
            onClick={handleClose}
            sx={{ position: "fixed", top: 16, right: 16 }}
            color="primary"
            aria-label="add"
          >
            <CloseIcon />
          </Fab>
          <Box
            component="div"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ minWidth: 275, background: "rgba(255,255,255,0)" }}
          >
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ maxWidth: 345 }}
            >
              <img
                width="80%"
                src="/pengin/pengin_question.png"
                className="App-logo"
                alt="logo"
              />
            </Box>
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
              sx={{
                maxWidth: 345,
                minWidth: 275,
                background: "rgba(255,255,255)",
              }}
            >
              <CardContent>
                <TextField
                  autoFocus
                  id="content"
                  label="質問"
                  multiline
                  minRows={4}
                  maxRows={6}
                  fullWidth
                  value={textForm}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTextForm(event.target.value);
                  }}
                  variant="filled"
                />
              </CardContent>
            </Card>
          </Box>
          <Box
            component="div"
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={5}
            sx={{ width: "100%" }}
          >
            <Button
              sx={{
                // marginLeft: "auto",
                // marginRight: "10px",
                // paddingRight: "10px",
                width: "100%",
                maxWidth: 345,
                minWidth: 275,
                height: "70px",
                borderRadius: "30px",
                fontSize: "30px",
                backgroundImage: "url(/back.png)",
                backgroundSize: "cover",
                textShadow: "#4172AC 1px 0 10px;",
              }}
              onClick={handleSend}
              variant="contained"
              // startIcon={<TipsAndUpdatesIcon />}
            >
              <ruby>
                凍稿<rt>トウコウ</rt>する
              </ruby>
            </Button>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
