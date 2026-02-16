import { FaRegHeart, FaRegComment, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { formatDateWithDiff } from "../utils/formatDate";
import PropTypes from "prop-types";
import CommentCard from "./CommentCard";
import { useState } from "react";
import { readComment, createComment, updatePost, deletePost, toggleLike } from "../api/fan";
import useAuth from "../contexts/AuthContext";

export default function PostCard({ post, openCommentPostId, setOpenCommentPostId, openEditingPostId, setOpenEditingPostId, onPostEdited, onPostDeleted }) {
    const [fetchedComments, setFetchedComments] = useState([]);
    const [comment, setComment] = useState("");
    const [error, setError] = useState({});
    const [openReplyCommentId, setOpenReplyCommentId] = useState(null);
    const [openEditingCommentId, setOpenEditingCommentId] = useState(null);
    const [newPostContent, setNewPostContent] = useState(post.content);
    const [liked, setLiked] = useState(post.user_liked ?? false);
    const [likeCount, setLikeCount] = useState(post.likes_count ?? 0);
    const { authUser } = useAuth();

    const handleCommentChange = (e) => setComment(e.target.value);

    const fetchComments = async () => {
        try {
            const comments = await readComment(post.id);
            setFetchedComments(comments);
        } catch (err) {
            console.error("Comment fetching failed: ", err);
        }
    };

    const handlePostCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await createComment(post.id, comment);
            setComment("");
            setError({});
            fetchComments();
        } catch (err) {
            console.error("Comment creation failed: ", err);
            setError(err.response?.data?.errors || {});
        }
    };

    const handleCommentClicked = () => {
        if (openCommentPostId === post.id) {
            setOpenCommentPostId(null);
        } else {
            setOpenCommentPostId(post.id);
            fetchComments();
        }
    };

    const handleIsEditingChange = () => {
        if (openEditingPostId === post.id) {
            setOpenEditingPostId(null);
        } else {
            setOpenEditingPostId(post.id);
        }
        setNewPostContent(post.content);
    };

    const handleNewPostContentChange = (e) => {
        setNewPostContent(e.target.value);
    };

    const handleDeleteSubmit = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;
        try {
            await deletePost(post.id);
            if (openCommentPostId === post.id) setOpenCommentPostId(null);
            onPostDeleted(post.id);
        } catch (err) {
            console.error("Post deletion failed: ", err);
            alert("Failed to delete post.");
        }
    };

    const handleNewPostContentSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost(post.id, newPostContent);
            setOpenEditingPostId(null);
            onPostEdited();
        } catch (err) {
            console.error("Post update failed: ", err);
        }
    };

    const handleLike = async () => {
        try {
            const res = await toggleLike(post.id, "post");
            setLiked(res.liked);
            setLikeCount(prev => res.liked ? prev + 1 : prev - 1);
        } catch (err) {
            console.error("Like failed:", err);
        }
    };

    const parentComments = fetchedComments.filter(c => c.parent_id === null);

    return (
        <>
            <div className="card mt-3">
                <div className="card-header">
                    <div className="d-flex gap-5">
                        <p>{post.user.name}</p>
                        <small className="text-muted">
                            {post.created_at !== post.updated_at && <span className="me-1">Edited</span>}
                            {formatDateWithDiff(post.updated_at)}
                        </small>
                        {post.user_id === authUser.id &&
                            <div className="d-flex">
                                <button className="btn btn-light" onClick={handleIsEditingChange}><FaEdit style={{ color: "deepPink" }} /></button>
                                <button className="btn btn-light" onClick={handleDeleteSubmit}><MdDelete style={{ color: "tomato" }} /></button>
                            </div>
                        }
                    </div>
                </div>
                <div className="card-body">
                    {openEditingPostId === post.id ?
                        <form onSubmit={handleNewPostContentSubmit}>
                            <input className="form-control" type="text" value={newPostContent} onChange={handleNewPostContentChange} required />
                            <button className="form-control btn btn-primary">Save Changes</button>
                        </form> :
                        <p className="card-text">{post.content}</p>}
                </div>
                <div className="card-footer">
                    <div className="d-flex gap-5">
                        <button className="btn btn-light" onClick={handleLike}>
                            <FaRegHeart style={{ color: liked ? "red" : "magenta" }} />
                            {likeCount}
                        </button>
                        <button className="btn btn-light d-flex align-items-center gap-2" onClick={handleCommentClicked}>
                            <FaRegComment style={{ color: "magenta" }} />
                            <span>Comment</span>
                        </button>
                    </div>
                </div>
            </div>

            {openCommentPostId === post.id && (
                <div className="mt-2 ms-5">
                    <form onSubmit={handlePostCommentSubmit} className="mb-2">
                        <div className="d-flex gap-2">
                            <input
                                className="form-control"
                                value={comment}
                                onChange={handleCommentChange}
                                type="text"
                                placeholder="Share your comment ..."
                                autoFocus
                                required
                            />
                            <button type="submit"><IoSend style={{ color: "magenta" }} /></button>
                        </div>
                        {error.content && <small className="text-danger">{error.content[0]}</small>}
                    </form>

                    {parentComments.length > 0 && <div className="mt-2 mb-1">Others' comments</div>}
                    {parentComments.map(pc => (
                        <CommentCard
                            key={pc.id}
                            postId={post.id}
                            parentComment={pc}
                            fetchedComments={fetchedComments}
                            refreshComments={setFetchedComments}
                            openReplyCommentId={openReplyCommentId}
                            setOpenReplyCommentId={setOpenReplyCommentId}
                            openEditingCommentId={openEditingCommentId}
                            setOpenEditingCommentId={setOpenEditingCommentId}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    openCommentPostId: PropTypes.number,
    setOpenCommentPostId: PropTypes.func.isRequired,
};
