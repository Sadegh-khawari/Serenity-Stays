import {useForm} from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import {useCreateCabin} from "./useCreateCabin";
import {useEditCabin} from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const {errors} = formState;

    const {isCreating, createCabin} = useCreateCabin();

    const {isEditing, editCabin} = useEditCabin();

    const isWorking = isCreating || isEditing;

    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession)
            editCabin(
                {newCabinData: {...data, image}, id: editId},
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        else
            createCabin(
                {...data, image: image},
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin Photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Update Cabin" : "Create new cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
