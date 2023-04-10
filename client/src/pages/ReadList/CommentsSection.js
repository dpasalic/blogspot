import { useState, useEffect } from "react";
import { formatTimeAgo } from "../../helpers";
import lightNoCommentSVG from "../../assets/light-no-comment.svg";
import darkNoCommentSVG from "../../assets/dark-no-comment.svg";
import verdantNoCommentSVG from "../../assets/verdant-no-comment.svg";
import TextInput from "../../components/Inputs/TextInput";

const CommentsSection = ({ comments, createComment, getComments, currentBlog, theme }) => {
    const [comment, setComment] = useState("");

    useEffect(() => {
        getComments(currentBlog.id);
    }, [currentBlog.id])

    const renderComments = () => {
        if (comments.length === 0) {
            return <img
                src={theme === "light" ? lightNoCommentSVG :
                theme === "dark" ? darkNoCommentSVG : verdantNoCommentSVG}
                alt="no comment illustration"
                className="no-comment-png" />;
        }
        return comments.map(com => {
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
            createComment(currentBlog.id, comment);
            setComment("");
        }
    };

    return (
        <div className="comments-wrapper">
            <form noValidate>
                <TextInput
                    id="comment"
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
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
                <div className="all-comments-text">All comments ({comments.length})</div>
                <div className="comments-hr"></div>
                {renderComments()}
            </div>
        </div>
    );
};

export default CommentsSection;