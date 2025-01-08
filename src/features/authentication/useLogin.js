import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueriesData(["user"], user);
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Provided email or password are incorrect");
        },
    });
    console.log("isLoading", isLoading);
    return { login, isLoading };
}

export { useLogin };
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// function useLogin() {
//     const queryClient = useQueryClient();
//     const navigate = useNavigate();

//     const mutation = useMutation({
//         mutationFn: ({ email, password }) => loginApi({ email, password }),
//         onSuccess: (user) => {
//             queryClient.setQueriesData(["user"], user);
//             navigate("/dashboard");
//         },
//         onError: (err) => {
//             console.log("ERROR", err);
//             toast.error("Provided email or password are incorrect");
//         },
//     });
//     // console.log('isLoading: ', isLoading);
//     return {
//         login: mutation.mutate,
//         isLoading: mutation.isLoading,
//     };
// }

// export { useLogin };
