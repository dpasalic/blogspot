import { connect } from "react-redux";
import Navigation from "../Navigation";
import "./layout.scss";

const Layout = ({ children, theme }) => {
    return (
        <div className={`theme-${theme}`}>
            <div className="body">
                <div className="glass-wrapper">
                    <Navigation />
                    <div className="container">
                        {children}
                    </div>
                </div>
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