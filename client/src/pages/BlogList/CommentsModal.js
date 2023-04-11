import { useState, useEffect } from "react";
import { formatTimeAgo } from "../../helpers";
import Modal from "../../components/Modal";
import TextInput from "../../components/Inputs/TextInput";
import lightNoCommentSVG from "../../assets/light-no-comment.svg";
import darkNoCommentSVG from "../../assets/dark-no-comment.svg";
import verdantNoCommentSVG from "../../assets/verdant-no-comment.svg";

const CommentsModal = ({
    modalOpen, setModalOpen, currentCommentsBlog, currentCommentsUser,
    comments, createComment, theme
}) => {
    const [comment, setComment] = useState("");
    const [allCommentsLength, setAllCommentsLength] = useState(0);

    // Clear comment input after modal close
    useEffect(() => {
        if (!modalOpen) {
            setComment("");
        }
    }, [modalOpen]);

    const renderComments = () => {
        // Extract comments for current blog
        const commentsArr = Object.values(comments)
            .filter(com => com.blogId === currentCommentsBlog.id);

        // Set comments array length
        if (allCommentsLength !== commentsArr.length) {
            setAllCommentsLength(commentsArr.length);
        }

        // Return appropriate illustration when there are no comments
        if (commentsArr.length === 0) {
            return <img
                src={theme === "light" ? lightNoCommentSVG :
                    theme === "dark" ? darkNoCommentSVG : verdantNoCommentSVG}
                alt="no comment illustration"
                className="no-comment-png" />;
        }
        
        return commentsArr.map(com => {
            const timestamp = formatTimeAgo(new Date(com.createdAt * 1000));
            return <div
                key={com.id}
                className="comment-wrapper">
                <div className="comment-timestamp">{timestamp}</div>
                <div className="comment-body">{com.body}</div>
            </div>
        });
    };

    const onCommentSubmit = (e) => {
        e.preventDefault();
        if (comment) {
            createComment(currentCommentsBlog.id, comment);
            setComment("");
        }
    };

    return (
        <Modal
            modalOpen={modalOpen}
            onClose={setModalOpen}>
            <div className="modal-header">
                <h2>
                    {currentCommentsBlog.title}
                    <div className="modal-user comments-modal-user">
                        {`${currentCommentsUser.firstName} ${currentCommentsUser.lastName}`}
                    </div>
                </h2>
                <div
                    onClick={() => setModalOpen(false)}
                    className="material-symbols-outlined close-icon">
                    close
                </div>
            </div>

            <form noValidate>
                <TextInput
                    id="comment"
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    //error={errors.email}
                    autoFocus />
                <div className="comment-buttons-wrapper">
                    <button
                        onClick={() => setComment("")}
                        className="comment-button" type="button">
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                    <button
                        onClick={onCommentSubmit}
                        className={`comment-button ${!comment ? "disabled-submit-comment-button" : ""}`} type="submit">
                        <span className="material-symbols-outlined">
                            send
                        </span>
                    </button>
                </div>
            </form>

            <div className="comments-wrapper">
                <div className="all-comments-text">All comments ({allCommentsLength})</div>
                <div className="comments-hr"></div>
                {renderComments()}
            </div>
        </Modal>
    );
};

export default CommentsModal;