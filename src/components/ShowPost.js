import React from "react";
import './Home.css'

const ShowPost = ({ entity, upVote, downVote }) => {
    return (<>
        <div className="strip">
            <div>
                <button className="updownkey up" onClick={() => upVote(entity)}>+</button>
                <div >{entity.upvote}</div>
            </div>
            <div>
                <button className="updownkey down" onClick={() => downVote(entity)}>-</button>
                <div>{entity.downvote}</div>
            </div>
            <div className="post-val">
                {entity.value}
            </div>
        </div>
    </>)
}
export default ShowPost;