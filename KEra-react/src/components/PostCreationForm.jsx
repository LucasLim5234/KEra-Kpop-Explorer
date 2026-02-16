import { useState } from "react";
import PropTypes from "prop-types";
import { createPost } from "../api/fan";

export default function PostCreationForm({ onDone }) {
    const [formData, setFormData] = useState({ content: "" });
    const [error, setError] = useState({});
    const [success, setSuccess] = useState("");

    const handleFormChange = (e) => {
        setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPost(formData);
            setFormData({ content: "" });
            setError({});
            setSuccess("Post created successfully");
            onDone();
            setTimeout(() => {
                setSuccess("");
            }, 5000);
        } catch (err) {
            console.error("Post creation failed: ", err);
            setError(err.response?.data?.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {success &&
                <div className="alert alert-info" role="alert">
                    {success}
                </div>
            }
            <label className="form-label">Content: </label>
            <textarea className="form-control" name="content" value={formData.content} onChange={handleFormChange} placeholder="Share something about your favorite K-pop group ..." required></textarea>
            {error.content && <small className="text-danger">{error.content[0]}</small>}
            <button className="btn btn-primary w-100 mt-3">Post</button>
        </form>
    );
}

PostCreationForm.propTypes = {
    onDone: PropTypes.func
}