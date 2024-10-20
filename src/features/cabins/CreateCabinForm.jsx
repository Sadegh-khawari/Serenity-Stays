import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabins } from "../../services/apiCabins";

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const queryClient = useQueryClient();
    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabins,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data) {
        mutate(data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
                    {...register("name", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum Capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    {...register("maxCapacity", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular Price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    disabled={isCreating}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Regular price should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isCreating}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required.",
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    disabled={isCreating}
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin Photo">
                <FileInput id="image" accept="image/*" />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
