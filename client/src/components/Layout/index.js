import { connect } from "react-redux";
import "./layout.scss";

const Layout = ({ children, theme }) => {
    return (
        <div className={`theme-${theme}`}>
            <div className="body">
                {children}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { theme: state.theme };
};

export default connect(
    mapStateToProps
)(Layout);