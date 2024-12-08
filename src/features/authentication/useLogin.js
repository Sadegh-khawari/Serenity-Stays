import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogin() {
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            console.log(user);
            navigate("/dashboard");
        },
        onError: (error) => {
            console.log("ERROR", error);
            toast.error("Provide email or password are incorrect");
        },
    });

    return { login, isLoading };
}

export { useLogin };
