import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);

    display: flex;
    justify-content: center;
    align-items: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    //1. Load the authenticated user
    const { isAuthenticated, isLoading } = useUser();

    //2. If there is NO authenticated user, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated, isLoading]);

    //3. While loading, show the spinner
    if (isLoading) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    }

    //4. If there is an authenticated user, show the children
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
