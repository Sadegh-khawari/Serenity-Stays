import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.js";
import toast from "react-hot-toast";

function useUpdateSetting() {
    const queryClient = useQueryClient();

    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfully updated");
            queryClient.invalidateQueries({
                queryKey: ['settings'],
            })
        }, onError: (err) => toast.error(err.message)
    })
    return { isUpdating,updateSetting};
}

export {useUpdateSetting};