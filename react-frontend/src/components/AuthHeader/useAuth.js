import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/actions/authActions";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const [errors, setErrors] = useState([]);
    const [isPasswordVisable, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        const checkLoggedIn = () => {
            if (isLoggedIn) navigate("/main");
        };
        checkLoggedIn();
    }, []);

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const loginData = new FormData(event.currentTarget);

        const user = {
            email: loginData.get("email"),
            password: loginData.get("password")
        };

        fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
          }).then((r) => {
            if (r.ok) {
              r.json().then((data) => {
                setErrors([]);
                dispatch(setUser(data));
                console.log("User has been logged in!", user);
                navigate("/main");
              });
            } else {
              r.json().then((err) => {
                setErrors(prev => [...prev, err.error]);
                console.error(err.error);
              });
            }
          });
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        const signupData = new FormData(event.currentTarget);
        
        const user = {
            // full_name: data.get("fullName"),
            email: signupData.get("email"),
            password: signupData.get("password"),
            password_confirmation: signupData.get("password"), // Temporarily added this to make password encryption work
        };

        fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({user: user})
          }).then((r) => {
            if (r.ok) {
              r.json().then((data) => {
                setErrors([]);
                dispatch(setUser(data));
                navigate("/main");
              });
            } else {
              r.json().then((err) => {
                setErrors(prev => [...prev, err.error]);
                console.error(err.error);
              });
            }
          });
    };

    const toggleIsPasswordVisible = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return {
        errors,
        isPasswordVisable,
        toggleIsPasswordVisible,
        handleLoginSubmit,
        handleSignupSubmit
    };
};

export default useAuth;