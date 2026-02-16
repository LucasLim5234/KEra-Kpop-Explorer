import { FaRegHeart, FaRegComment, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { formatDateWithDiff } from "../utils/formatDate";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createComment, updateComment, deleteComment, toggleLike } from "../api/fan";
import useAuth from "../contexts/AuthContext";

export default function CommentCard({
    postId,
    parentComment,
    fetchedComments,
    refreshComments,
    openReplyCommentId,
    setOpenReplyCommentId,
    openEditingCommentId,
    setOpenEditingCommentId
}) {
    const [reply, setReply] = useState("");
    const [error, setError] = useState({});
    const [childrenComments, setChildrenComments] = useState([]);
    const [newContent, setNewContent] = useState(parentComment.content);
    const [liked, setLiked] = useState(parentComment.user_liked ?? false);
    const [likeCount, setLikeCount] = useState(parentComment.likes_count ?? 0);
    const { authUser } = useAuth();

    const handleReplyChange = (e) => setReply(e.target.value);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            const newComment = await createComment(postId, reply, parentComment.id);

            refreshComments(prev => [...prev, newComment]);

            setReply("");
            setError({});
            setOpenReplyCommentId(null);
        } catch (err) {
            console.error("Reply creation failed: ", err);
            setError(err.response?.data?.errors || {});
        }
    };

    const toggleReplyInput = () => {
        if (openReplyCommentId === parentComment.id) {
            setOpenReplyCommentId(null);
        } else {
            setOpenReplyCommentId(parentComment.id);
        }
    };

    const toggleEdit = () => {
        if (openEditingCommentId === parentComment.id) {
            setOpenEditingCommentId(null);
        } else {
            setOpenEditingCommentId(parentComment.id);
        }
        setNewContent(parentComment.content);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await updateComment(parentComment.id, newContent);
            refreshComments(prev =>
                prev.map(c =>
                    c.id === updated.id ? updated : c
                )
            );
            setOpenEditingCommentId(null);
        } catch (err) {
            console.error("Comment update failed:", err);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this comment?");
        if (!confirmed) return;

        try {
            await deleteComment(parentComment.id);
            refreshComments(prev =>
                prev.filter(c =>
                    c.id !== parentComment.id &&
                    c.parent_id !== parentComment.id
                )
            );
        } catch (err) {
            console.error("Comment delete failed:", err);
        }
    };

    const handleLike = async () => {
        try {
            const res = await toggleLike(parentComment.id, "comment");
            setLiked(res.liked);
            setLikeCount(prev => res.liked ? prev + 1 : prev - 1);
        } catch (err) {
            console.error("Like failed:", err);
        }
    };

    useEffect(() => {
        setChildrenComments(
            fetchedComments.filter(c => c.parent_id === parentComment.id)
        );
    }, [fetchedComments, parentComment.id]);

    return (
        <div className="ms-4">
            <div className="card mb-2">
                <div className="card-header d-flex justify-content-between">
                    <div className="d-flex gap-5">
                        <p>{parentComment.user.name}</p>
                        <small className="text-muted">
                            {parentComment.created_at !== parentComment.updated_at && (
                                <span className="me-1">Edited</span>
                            )}
                            {formatDateWithDiff(parentComment.updated_at)}
                        </small>
                    </div>

                    {parentComment.user_id === authUser.id && (
                        <div className="d-flex gap-2">
                            <button className="btn btn-light" onClick={toggleEdit}>
                                <FaEdit style={{ color: "deepPink" }} />
                            </button>
                            <button className="btn btn-light" onClick={handleDelete}>
                                <MdDelete style={{ color: "tomato" }} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="card-body">
                    {openEditingCommentId === parentComment.id ? (
                        <form onSubmit={handleUpdateSubmit}>
                            <input
                                className="form-control"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                required
                            />
                            <button className="btn btn-primary mt-2">
                                Save
                            </button>
                        </form>
                    ) : (
                        <p className="card-text">{parentComment.content}</p>
                    )}
                </div>

                <div className="card-footer">
                    <div className="d-flex gap-3">
                        <button className="btn btn-light d-flex align-items-center gap-2" onClick={handleLike}>
                            <FaRegHeart style={{ color: liked ? "red" : "magenta" }} />
                            <span>{likeCount}</span>
                        </button>
                        <button
                            className="btn btn-light d-flex align-items-center gap-2"
                            onClick={toggleReplyInput}
                        >
                            <FaRegComment style={{ color: "magenta" }} />
                            <span>Reply</span>
                        </button>
                    </div>
                </div>
            </div>

            {openReplyCommentId === parentComment.id && (
                <form onSubmit={handleReplySubmit} className="mb-2 ms-3">
                    <div className="d-flex gap-2">
                        <input
                            className="form-control"
                            value={reply}
                            onChange={handleReplyChange}
                            type="text"
                            placeholder="Reply..."
                            autoFocus
                            required
                        />
                        <button type="submit">
                            <IoSend style={{ color: "magenta" }} />
                        </button>
                    </div>
                    {error.content && (
                        <small className="text-danger">
                            {error.content[0]}
                        </small>
                    )}
                </form>
            )}

            {childrenComments.length > 0 && (
                <div className="ms-4">
                    {childrenComments.map(child => (
                        <CommentCard
                            key={child.id}
                            postId={postId}
                            parentComment={child}
                            fetchedComments={fetchedComments}
                            refreshComments={refreshComments}
                            openReplyCommentId={openReplyCommentId}
                            setOpenReplyCommentId={setOpenReplyCommentId}
                            openEditingCommentId={openEditingCommentId}
                            setOpenEditingCommentId={setOpenEditingCommentId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

CommentCard.propTypes = {
    postId: PropTypes.number.isRequired,
    parentComment: PropTypes.object.isRequired,
    fetchedComments: PropTypes.array.isRequired,
    refreshComments: PropTypes.func.isRequired,
    openReplyCommentId: PropTypes.number,
    setOpenReplyCommentId: PropTypes.func.isRequired,
    openEditingCommentId: PropTypes.number,
    setOpenEditingCommentId: PropTypes.func.isRequired,
};
