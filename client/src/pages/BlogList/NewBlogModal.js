import { useState, useEffect } from "react";
import { validateNewBlog } from "../../helpers";
import Modal from "../../components/Modal";
import TextInput from "../../components/Inputs/TextInput";
import TextArea from "../../components/Inputs/TextArea";

const NewBlogModal = ({ modalOpen, setModalOpen, createBlog }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [validate, setValidate] = useState(false);
    const [errors, setErrors] = useState({});

    // If validation is active check for error on every input change
    useEffect(() => {
        if (validate) {
            const errors = validateNewBlog(title, body);
            setErrors(errors);
        }
    }, [title, body]);

    const onNewBlogSubmit = e => {
        e.preventDefault();

        const errors = validateNewBlog(title, body);
        if (Object.keys(errors).length === 0) {
            createBlog({ title, body });
            setModalOpen(false);
            setValidate(false);
            setTitle("");
            setBody("");
        } else {
            // Activate validation on every input change
            if (!validate) { setValidate(true); }
            setErrors(errors);
        }
    };

    const onModalClose = () => {
        setModalOpen(false);
        setValidate(false);
        setErrors({});
    };

    return (
        <Modal
            modalOpen={modalOpen}
            onClose={onModalClose}>
            <div className="modal-header">
                <h2>New Blog</h2>
                <div
                    onClick={onModalClose}
                    className="material-symbols-outlined close-icon">
                    close
                </div>
            </div>
            <form onSubmit={onNewBlogSubmit} noValidate>
                <TextInput
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={errors.title}
                    autoFocus />
                <TextArea
                    id="body"
                    label="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    error={errors.body} />
                <button className="new-blog-submit-button" type="submit">
                    <div>
                        <span className="material-symbols-outlined login-submit-icon">post_add</span>
                        Submit
                    </div>
                </button>
            </form>
        </Modal>
    );
};

export default NewBlogModal;