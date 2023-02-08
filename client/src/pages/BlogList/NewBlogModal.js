import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import TextInput from "../../components/Inputs/TextInput";
import TextArea from "../../components/Inputs/TextArea";
import { validateNewBlog } from "../../helpers";

const NewBlogModal = ({ modalOpen, setModalOpen, createBlog }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [validate, setValidate] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (validate) {
            const errors = validateNewBlog(title, body);
            setErrors(errors);
        }
    }, [title, body]);

    const onNewBlogSubmit = (e) => {
        e.preventDefault();

        if (!validate) { setValidate(true); }

        const errors = validateNewBlog(title, body);
        if (Object.keys(errors).length === 0) {
            createBlog({ title, body });
            setModalOpen(false);
            setValidate(false);
            setTitle("");
            setBody("");
        } else {
            setErrors(errors);
        }
    };

    return (
        <Modal
            modalOpen={modalOpen}
            onClose={() => setModalOpen(false)}>
            <h2>New Blog</h2>
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
                <button className="hehe" type="submit">
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