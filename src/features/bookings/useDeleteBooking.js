import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
    const queryClient = useQueryClient();

    const {isLoading: isDeletingBooking, mutate: deleteBooking} = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Booking successfully deleted");
            queryClient.invalidateQueries({
                queryKey:['bookings'],
            })
        },
        onError: () => toast.error("There was an error while deleting the booking"),
    })

    return { isDeletingBooking, deleteBooking }
}

export { useDeleteBooking };
