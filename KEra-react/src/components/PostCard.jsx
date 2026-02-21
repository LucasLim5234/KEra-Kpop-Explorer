import { FaRegHeart, FaHeart, FaRegComment, FaEdit } from "react-icons/fa";
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
        <div className="w-100 mb-4">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                {/* Header: User Info & Actions */}
                <div className="card-header bg-white border-bottom-0 pt-3 px-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-dark rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: "35px", height: "35px", fontSize: "0.8rem" }}>
                                {post.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold">{post.user.name}</h6>
                                <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                                    {post.created_at !== post.updated_at && <span className="me-1 fw-bold text-primary">Edited •</span>}
                                    {formatDateWithDiff(post.updated_at)}
                                </small>
                            </div>
                        </div>

                        {post.user_id === authUser.id && (
                            <div className="dropdown">
                                <button className="btn btn-light btn-sm rounded-pill" onClick={handleIsEditingChange}>
                                    <FaEdit className="text-secondary" />
                                </button>
                                <button className="btn btn-light btn-sm rounded-pill ms-1" onClick={handleDeleteSubmit}>
                                    <MdDelete className="text-danger" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Body: Content */}
                <div className="card-body px-3 py-2">
                    {openEditingPostId === post.id ? (
                        <form onSubmit={handleNewPostContentSubmit} className="mt-2">
                            <textarea 
                                className="form-control rounded-3 mb-2" 
                                rows="3"
                                value={newPostContent} 
                                onChange={handleNewPostContentChange} 
                                required 
                            />
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-dark btn-sm px-3 rounded-pill">Save</button>
                                <button type="button" className="btn btn-light btn-sm px-3 rounded-pill" onClick={() => setOpenEditingPostId(null)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <p className="card-text fs-6 lh-base text-dark">{post.content}</p>
                    )}
                </div>

                {/* Footer: Stats & Buttons */}
                <div className="card-footer bg-white border-top-0 pb-3 px-3">
                    <hr className="mt-0 mb-3 opacity-10" />
                    <div className="d-flex gap-4">
                        <button className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-2 transition-all" onClick={handleLike}>
                            {liked ? <FaHeart className="text-danger fs-5" /> : <FaRegHeart className="text-dark opacity-50 fs-5" />}
                            <span className={`fw-bold ${liked ? "text-danger" : "text-dark"}`}>{likeCount}</span>
                        </button>
                        
                        <button className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-2 text-dark opacity-75" onClick={handleCommentClicked}>
                            <FaRegComment className="fs-5" />
                            <span className="fw-bold">Comment</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            {openCommentPostId === post.id && (
                <div className="mt-2 ps-4 border-start border-2 ms-3 border-light">
                    <form onSubmit={handlePostCommentSubmit} className="mb-3">
                        <div className="input-group bg-white rounded-pill shadow-sm border px-2 py-1">
                            <input
                                className="form-control border-0 bg-transparent shadow-none"
                                value={comment}
                                onChange={handleCommentChange}
                                type="text"
                                placeholder="Write a comment..."
                                autoFocus
                                required
                            />
                            <button className="btn btn-link text-primary border-0" type="submit">
                                <IoSend className="fs-5" style={{ color: "magenta" }} />
                            </button>
                        </div>
                        {error.content && <small className="text-danger ms-3 mt-1 d-block">{error.content[0]}</small>}
                    </form>

                    {parentComments.length > 0 && (
                        <div className="mb-3">
                            <span className="badge bg-light text-dark fw-normal rounded-pill px-3 py-2">
                                {parentComments.length} {parentComments.length === 1 ? 'Comment' : 'Comments'}
                            </span>
                        </div>
                    )}

                    <div className="d-flex flex-column gap-3">
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
                </div>
            )}
        </div>
    );
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    openCommentPostId: PropTypes.number,
    setOpenCommentPostId: PropTypes.func.isRequired,
    openEditingPostId: PropTypes.number,
    setOpenEditingPostId: PropTypes.func.isRequired,
    onPostEdited: PropTypes.func.isRequired,
    onPostDeleted: PropTypes.func.isRequired,
};