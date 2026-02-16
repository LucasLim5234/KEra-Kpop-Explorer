import { useEffect, useState } from "react";
import PostCreationForm from "../../../components/PostCreationForm";
import { readPost } from "../../../api/fan";
import PostCard from "../../../components/PostCard";

export default function FanIndex() {
    const [postCategory, setPostCategory] = useState("all");
    const [post, setPost] = useState([]);
    const [openCommentPostId, setOpenCommentPostId] = useState(null);
    const [openEditingPostId, setOpenEditingPostId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handlePostCategory = (e) => {
        setPostCategory(e.target.value);
    };

    const fetchPosts = async () => {
        setLoading(true);
        setError(false);
        try {
            const fetchedPosts = await readPost(postCategory);
            setPost(fetchedPosts);
        } catch (err) {
            console.error("Post fetching failed: ", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const handlePostDeleted = (deletedPostId) => {
        setPost(p => p.filter(i => i.id !== deletedPostId));
    };

    useEffect(() => {
        fetchPosts();
    }, [postCategory]);

    return (
        <>
            <div>
                <PostCreationForm onDone={fetchPosts} />
                <div className="mt-3">
                    <input
                        type="radio"
                        id="all"
                        name="post_category"
                        value="all"
                        checked={postCategory === "all"}
                        onChange={handlePostCategory}
                    />
                    <label htmlFor="all" className="ms-1 me-3">
                        All Posts
                    </label>

                    <input
                        type="radio"
                        id="mine"
                        name="post_category"
                        value="mine"
                        checked={postCategory === "mine"}
                        onChange={handlePostCategory}
                    />
                    <label htmlFor="mine" className="ms-1">
                        My Posts
                    </label>
                </div>

                {loading && <div className="d-flex justify-content-center align-items-center gap-3" style={{ minHeight: "60vh" }}>
                    <div className="spinner-grow text-primary" role="status"></div>
                    <div className="spinner-grow text-primary" role="status"></div>
                    <div className="spinner-grow text-primary" role="status"></div>
                </div>}

                {error && <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                    <p>Oops! Seems like fail to load posts</p>
                    <button className="btn btn-primary" onClick={() => fetchPosts()}>
                        Retry
                    </button>
                </div>}

                {!loading && !error && (post.length === 0 ?
                    <p>No post found</p> :
                    <div>
                        {post.map((p) => {
                            return <PostCard key={p.id} post={p} openCommentPostId={openCommentPostId} setOpenCommentPostId={setOpenCommentPostId} openEditingPostId={openEditingPostId} setOpenEditingPostId={setOpenEditingPostId} onPostEdited={fetchPosts} onPostDeleted={handlePostDeleted} />
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
