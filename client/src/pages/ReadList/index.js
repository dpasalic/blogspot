import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import { getBlogAndUser, addReadingBlog, addAsRead, addToReadList } from "../../actions";
import ListIndicator from "./ListIndicator";
import SwitchButtons from "./SwitchButtons";
import "./read-list.scss";

const ReadList = ({
    getBlogAndUser, addReadingBlog, addAsRead, addToReadList,
    currentBlog, blogAuthor, readBlogs, blogsToRead
}) => {
    const [blogsArr, setBlogsArr] = useState([]);
    const [arrPosition, setArrPosition] = useState(0);
    const [switchClick, setSwitchClick] = useState({});
    const [leftSwitchAnimation, setLeftSwitchAnimation] = useState("");
    const [rightSwitchAnimation, setRightSwitchAnimation] = useState("");
    const [params, setParams] = useSearchParams();
    const blogId = params.get("blogId");

    useEffect(() => {
        if (blogId) {
            getBlogAndUser(blogId);
        }
    }, []);

    useEffect(() => {
        if (currentBlog) {
            setParams({ blogId: currentBlog.id });
        }

        if (currentBlog && blogsArr.length === 0) {
            const readBlogsDistinct = Object.values(readBlogs).filter(e => e.id !== currentBlog.id);
            const blogsToReadDistinct = Object.values(blogsToRead).filter(e => e.id !== currentBlog.id);
            setBlogsArr([...readBlogsDistinct, currentBlog, ...blogsToReadDistinct]);
            setArrPosition(readBlogsDistinct.length);
        }

        if (currentBlog && !(readBlogs.find(e => e.id === currentBlog.id))) {
            addAsRead(currentBlog);
        }
    }, [currentBlog]);

    const onSwitchLeft = () => {
        if (leftSwitchAnimation) {
            return;
        }

        if (arrPosition > 0) {
            // using object for switch click value to
            // force react to rerender ListIndicator component
            // primitive value of "left" would not rerender consecutive lefy clicks
            setLeftSwitchAnimation("switch-animation");
            setTimeout(() => setLeftSwitchAnimation(""), 750);

            setTimeout(() => {
                setSwitchClick({ left: true });
                addReadingBlog(blogsArr[arrPosition - 1]);
                setArrPosition(arrPosition - 1);
            }, 375);
        }
    };

    const onSwitchRight = () => {
        if (rightSwitchAnimation) {
            return;
        }

        if (arrPosition < blogsArr.length - 1) {
            setRightSwitchAnimation("switch-animation");
            setTimeout(() => setRightSwitchAnimation(""), 750);

            setTimeout(() => {
                setSwitchClick({ right: true });
                addReadingBlog(blogsArr[arrPosition + 1]);
                setArrPosition(arrPosition + 1);
            }, 375);
        }
    };

    return (
        <div className="read-list-wrapper">
            <ListIndicator
                list={blogsArr}
                currentPosition={arrPosition}
                readBlogsLength={Object.values(readBlogs).filter(e => e.id !== currentBlog.id).length}
                switchClick={switchClick} />
            <SwitchButtons
                isLeftButtonActive={arrPosition > 0}
                isRightButtonActive={arrPosition < blogsArr.length - 1}
                onSwitchLeft={onSwitchLeft}
                onSwitchRight={onSwitchRight} />
            <div className={`switch-animation-container ${leftSwitchAnimation || rightSwitchAnimation ? "" : "hide-switch-animation-container"}`}>
                <div className="switch-animation-wrapper switch-animation-left-wrapper">
                    <div className={`switch-animation-circle ${leftSwitchAnimation}`}></div>
                </div>
                <div className="switch-animation-wrapper switch-animation-right-wrapper">
                    <div className={`switch-animation-circle ${rightSwitchAnimation}`}></div>
                </div>
            </div>

            {!currentBlog ? "Loading..." :
                <div className="reader">
                    <div className="reader-blog-title">
                        {currentBlog.title}
                    </div>
                    <div className="reader-blog-user">
                        {blogAuthor ? blogAuthor.firstName : ""}
                        {blogAuthor ? " " + blogAuthor.lastName : ""}
                    </div>
                    <div className="reader-blog-body">
                        {currentBlog.body}
                    </div>
                </div>}
        </div>
    );
};

const mapStateToProps = state => {
    const currentBlog = state.readList.currentBlog;

    return {
        currentBlog: currentBlog,
        blogAuthor: state.users[currentBlog ? currentBlog.userId : null],
        readBlogs: state.readList.readBlogs,
        blogsToRead: state.readList.blogsToRead
    };
};

export default connect(
    mapStateToProps,
    { getBlogAndUser, addAsRead, addReadingBlog, addToReadList }
)(ReadList);