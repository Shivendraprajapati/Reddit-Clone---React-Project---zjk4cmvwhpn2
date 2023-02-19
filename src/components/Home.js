import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import './Home.css'
import ShowPost from "./ShowPost";

const Home = () => {
    const [addNewPost, setAddNewPost] = useState(false);
    const [postList, setPostList] = useState([
{
    id:0,
    value:'Lorem Ipsum is simply dummy text of the printing and type setting industry',
    upvote: 3, 
    downvote: 1
}
    ]);

    const updatePostList = (post) => {
        setPostList([...postList, { id: postList.length, value: post, upvote: 0, downvote: 0 }]);
        setAddNewPost(false);
    }
    const addPost = () => {
        setAddNewPost(true);
    }
    const upVote = (entity) => {
        const newPostList = postList;
        newPostList[entity.id] = { ...entity, upvote: entity.upvote + 1 }
        setPostList([...newPostList]);
    }
    const downVote = (entity) => {
        const newPostList = postList;
        newPostList[entity.id] = { ...entity, downvote: entity.downvote - 1 }
        setPostList([...newPostList]);
    }
    useEffect(() => console.log(postList, 'postList'), [postList])

    const onCancel = () => {
        setAddNewPost(false);
    }
    const ConatinerView = () => {
        return (<> <div className="header">
            <button className="primaryBtn" onClick={addPost}>Add New Post</button>
        </div>
            <br />
            <div className="allpost">
                {postList.reverse().map((item, key) => <>
                    <ShowPost entity={item} upVote={upVote} downVote={downVote} key={key} />
                    <br />
                </>
                )}
            </div></>)
    }
    return (<>
        {addNewPost ?
            <div className="container">
                <ConatinerView />
            </div>
            :
            <div>
                <ConatinerView />
            </div>
        }
        {addNewPost && <div className="modal"><AddPost updatePostList={updatePostList} onCancel={onCancel} /></div>}
        
    </>)
}
export default Home;