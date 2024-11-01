import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner.jsx";

import useSettings from "./useSettings.js";

function UpdateSettingsForm() {

    const {
        isLoading,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {}
    } = useSettings();

    if (isLoading) <Spinner/>

    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input type='number' id='min-nights' defaultValue={minBookingLength}/>
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input type='number' id='max-nights' defaultValue={maxBookingLength}/>
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking}/>
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input type='number' id='breakfast-price' defaultValue={breakfastPrice}/>
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
