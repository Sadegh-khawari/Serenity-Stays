import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";


function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens='cabin-form'>
                <Button>Add new Cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateCabinForm/>
            </Modal.Window>
        </Modal>
    )
}

export default AddCabin;