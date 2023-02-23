import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../Theme";
import ListItem from "./ListItem";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../config/firebase";

function Listing() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const postsRef = collection(database, "posts");
  const [postsList, setPostsList] = useState([] || null);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        left: "27vw",
        top: "70px",
        maxWidth: "35vw",
        bgcolor: colors.grey[900],
      }}
    >
      {postsList.map((community) => (
        <ListItem community={community} />
      ))}
    </div>
  );
}

export default Listing;
