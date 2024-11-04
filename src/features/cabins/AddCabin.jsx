import {useState} from "react";

import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);


    return (
        <div>
            <Button onClick={() => setIsOpenModal((modal) => !modal)}>
                Add cabin
            </Button>
            {
                isOpenModal &&
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
                </Modal>
            }
        </div>
    )
}

export default AddCabin;