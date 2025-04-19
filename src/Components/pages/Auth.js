import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Auth() {
    const navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (initialized) return;

        const user = JSON.parse(localStorage.getItem("user"));
        const role = user ? user.role : null;
        const path = window.location.pathname;

        if (!user) {
            navigate("/login");
        } else if (role === "admin") {
            if (!path.startsWith("/admin") && path !== "/change-password" && path !== "/update-profile") {
                navigate("/admin");
            }
        } else if (role === "user") {
            if (!path.startsWith("/user") && path !== "/change-password-user" && path !== "/update-profile-user") {
                navigate("/user");
            }
        }

        setInitialized(true);
    }, [navigate, initialized]);

    return null;
}

export default Auth;
