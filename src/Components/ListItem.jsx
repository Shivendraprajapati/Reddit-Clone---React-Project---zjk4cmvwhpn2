import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../Theme";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import {
  RiShareForwardLine,
  RiBookmarkLine,
  RiBookmarkFill,
} from "react-icons/ri";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { database } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ListItem(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [vote, setVote] = useState([] || null);
  const voteRef = collection(database, "likes");
  const auth = getAuth();
  const [isClicked, setIsClicked] = useState({
    upvote: false,
    downvote: false,
    bookmark: false,
  });
  const getVote = async () => {
    const data = await getDocs(voteDoc);
    setVote(
      data.docs.map((doc) => ({ userId: doc.data().userId, voteId: doc.id })),
    );
  };
  const voteDoc = query(voteRef, where("postId", "==", props.community.id));

  const addVote = async () => {
    try {
      const newDoc = await addDoc(voteRef, {
        userId: auth.currentUser?.uid,
        postId: props.community.id,
      });
      if (auth.currentUser)
        setVote((prev) =>
          prev
            ? [...prev, { userId: auth.currentUser?.uid, voteId: newDoc.id }]
            : [{ userId: auth.currentUser?.uid, voteId: newDoc.id }],
        );
      setIsClicked((prev) => ({
        ...prev,
        downvote: false,
        upvote: !prev.upvote,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const removeVote = async () => {
    try {
      const voteToDeleteQuery = query(
        voteRef,
        where("postId", "==", props.community.id),
        where("userId", "==", auth.currentUser?.uid),
      );
      const voteToDeleteData = await getDocs(voteToDeleteQuery);
      const voteId = voteToDeleteData.docs[0].id;
      const voteToDelete = doc(database, "likes", voteId);
      await deleteDoc(voteToDelete);
      if (auth.currentUser)
        setVote(
          (prev) => prev && prev.filter((vote) => vote.voteId !== voteId),
        );

      setIsClicked((prev) => ({
        ...prev,
        upvote: false,
        downvote: !prev.downvote,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  const hasVoted = vote?.find((vote) => {
    return vote.userId === auth.currentUser?.uid;
  });

  useEffect(() => {
    getVote();
  }, []);

  // console.log(isClicked);
  return (
    <>
      <Card sx={{ margin: 2, bgcolor: colors.primary[400] }}>
        <CardHeader
          avatar={
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGGsSR8KrBNNbxZCL8iRRBJfuF19C7dSCYrQ&usqp=CAU" />
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={props.community.title}
          subheader={props.community.postBy}
        />
        {/* <CardMedia
          component="img"
          height="194"
          image="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
          alt="Paella dish"
        /> */}
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {props.community.text}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="upvote" onClick={addVote}>
            {isClicked.upvote ? (
              <ImArrowUp style={{ color: "green" }} />
            ) : (
              <BiUpvote />
            )}
          </IconButton>
          <Typography>{vote?.length}</Typography>
          <IconButton aria-label="downvote" onClick={removeVote}>
            {isClicked.downvote ? (
              <ImArrowDown style={{ color: "red" }} />
            ) : (
              <BiDownvote />
            )}
          </IconButton>
          <IconButton aria-label="upvote">
            <BiComment />
          </IconButton>
          <Typography>{props.community.comment}</Typography>
          <IconButton aria-label="upvote">
            <RiShareForwardLine />
          </IconButton>
          <IconButton
            aria-label="upvote"
            onClick={() => {
              setIsClicked((prev) => ({
                ...prev,
                bookmark: !prev.bookmark,
              }));
            }}
          >
            {auth.currentUser && isClicked.bookmark ? (
              <RiBookmarkFill style={{ color: colors.blueAccent[400] }} />
            ) : (
              <RiBookmarkLine />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
