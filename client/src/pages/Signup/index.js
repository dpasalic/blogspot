import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api";
import SignupForm from "./SignupForm";

const Signup = () => {
    const [signupError, setSignupError] = useState("");
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    
    const onFormSubmit = (firstName, lastName, email, password) => {
        setLoader(true);
        createUser({ firstName, lastName, email, password })
            .then(() => {
                setLoader(false);
                navigate("/login", { state: { signupSuccess: true } });
            })
            .catch((err) => {
                console.log(err);
                setLoader(false);
                const errMessage = err.response ? err.response.data : "Oops! Something went wrong!";
                setSignupError(errMessage);
            });
    };

    return <SignupForm
        onFormSubmit={onFormSubmit}
        signupError={signupError}
        loader={loader} />
};

export default Signup;