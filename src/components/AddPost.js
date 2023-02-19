import React, { useState } from 'react';
import './Home.css';

const AddPost = ({ updatePostList, onCancel }) => {
    const [postData, setPostData] = useState();


    return (<div className='addpost'>
        <div className='add-new-post'>Add New Post</div>
        <div className='post-title'>Post Title</div>
        <textarea name="post" rows="4" cols="40" value={postData} onChange={(e) => setPostData(e.target.value)} />
        {postData ?
            <div className='col2'>
                <button className="defaultBtn" onClick={onCancel}>Close</button>
                <button className="primaryBtn" onClick={() => updatePostList(postData)}>Save</button>
            </div> :
            <div className='col2'>
                <button className="defaultBtn" onClick={onCancel}>Close</button>
                <button className="primaryBtn" style={{ opacity: '0.2' }}>Save</button>
            </div>}

            
    </div>)
}
export default AddPost;