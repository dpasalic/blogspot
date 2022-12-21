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
            .then((res) => {
                setLoader(false);
                navigate("/login", { state: { signupSuccess: true } });
            })
            .catch((err) => {
                console.log(err);
                setLoader(false);
                setSignupError("Oops! Something went wrong!");
            });
    };

    return <SignupForm
        onFormSubmit={onFormSubmit}
        signupError={signupError}
        loader={loader} />
};
// redirect to login after signup

export default Signup;