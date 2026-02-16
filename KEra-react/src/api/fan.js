import api from "./axios";

export const createPost = async (formData) => {
    const res = await api.post("/api/post", formData);
    return res.data;
}

export const readPost = async (postCategory) => {
    const res = await api.get("/api/post", {
        params: { postCategory },
    });
    return res.data;
}

export const updatePost = async (postId, content) => {
    const res = await api.put(`/api/post/${postId}`, { content });
    return res.data;
};

export const deletePost = async (postId) => {
    const res = await api.delete(`/api/post/${postId}`);
    return res.data;
};

export const createComment = async (post_id, content, parent_id = null) => {
    const res = await api.post("/api/comment", { post_id, parent_id, content });
    return res.data;
}

export const readComment = async (post_id) => {
    const res = await api.get("/api/comment", {
        params: { post_id },
    });
    return res.data;
}

export const updateComment = async (commentId, content) => {
    const res = await api.put(`/api/comment/${commentId}`, { content });
    return res.data;
};

export const deleteComment = async (commentId) => {
    const res = await api.delete(`/api/comment/${commentId}`);
    return res.data;
};

export const toggleLike = async (likeable_id, likeable_type) => {
  const res = await api.post("/api/like", { likeable_id, likeable_type });
  return res.data;
};