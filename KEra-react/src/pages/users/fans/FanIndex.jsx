import { useEffect, useState, useCallback } from "react";
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

  const fetchPosts = useCallback(async () => {
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
  }, [postCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostDeleted = (deletedId) => {
    setPost((prev) => prev.filter((p) => p.id !== deletedId));
  };

  return (
    <div>
      <h1 className="idol-title">K-Pop Fandom Without Borders</h1>
      <p className="lead text-center mb-5">From Seoul to the world. Celebrating the global movement that turns strangers into a family!</p>
      <PostCreationForm onDone={fetchPosts} />
      <div className="d-flex align-items-center mt-5 mb-2 gap-3">
        <select
          className="form-select w-auto fan-theme-select"
          value={postCategory}
          onChange={handlePostCategory}
        >
          <option value="all">All Categories</option>
          <option value="idol">Idol</option>
          <option value="tour">Tour</option>
        </select>

        <div className="form-check mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="mine"
            value="mine"
            checked={postCategory === "mine"}
            onChange={(e) => setPostCategory(e.target.checked ? "mine" : "all")}
          />
          <label htmlFor="mine" className="form-check-label ms-1">
            My Posts
          </label>
        </div>
      </div>

      {loading && (
        <div
          className="d-flex justify-content-center align-items-center gap-3"
          style={{ minHeight: "60vh" }}
        >
          <div className="spinner-grow m-2 text-primary" role="status"></div>
          <div className="spinner-grow m-2 text-primary" role="status"></div>
          <div className="spinner-grow m-2 text-primary" role="status"></div>
        </div>
      )}

      {error && !loading && (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <p>Oops! Seems like we failed to load posts.</p>
          <button className="btn btn-primary" onClick={fetchPosts}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && post.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No posts found in this category.</p>
        </div>
      )}

      {!loading && !error && post.length > 0 && (
        <div className="justify-content-center">
          {post.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              openCommentPostId={openCommentPostId}
              setOpenCommentPostId={setOpenCommentPostId}
              openEditingPostId={openEditingPostId}
              setOpenEditingPostId={setOpenEditingPostId}
              onPostEdited={fetchPosts}
              onPostDeleted={handlePostDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
