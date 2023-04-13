import { useState, useEffect } from "react";
import { validateEditUser } from "../../helpers";
import Modal from "../../components/Modal";
import TextInput from "../../components/Inputs/TextInput";
import PasswordInput from "../../components/Inputs/PasswordInput";

const EditUserModal = ({ modalOpen, setModalOpen, user, onUserEdit }) => {
    const [userEdit, setUserEdit] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [validate, setValidate] = useState(false);
    const [errors, setErrors] = useState({});

    // Set userEdit object on modal open
    useEffect(() => {
        if (modalOpen && Object.keys(user).length > 0) {
            setUserEdit({ ...user, password: "" });
        }
    }, [modalOpen]);

    useEffect(() => {
        if (validate) {
            const errors = validateEditUser(userEdit.firstName, userEdit.lastName, userEdit.email, userEdit.password);
            setErrors(errors);
        }
    }, [userEdit]);

    const onNewBlogSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = userEdit;

        if (!validate) { setValidate(true); }

        const errors = validateEditUser(firstName, lastName, email, password);
        if (Object.keys(errors).length === 0) {
            if (userEdit.password) {
                onUserEdit(user.id, { firstName, lastName,email, password });
            } else {
                onUserEdit(user.id, { firstName, lastName, email });
            }
            
            setModalOpen(false);
            setValidate(false);
        } else {
            setErrors(errors);
        }
    };

    const onModalClose = () => {
        setModalOpen(false);
        setValidate(false);
        setErrors({});
    };

    return (
        <Modal
            modalOpen={modalOpen}
            onClose={onModalClose}>
            <div className="modal-header">
                <h2>Edit Your Profile</h2>
                <div
                    onClick={onModalClose}
                    className="material-symbols-outlined close-icon">
                    close
                </div>
            </div>
            <form onSubmit={onNewBlogSubmit} noValidate>
                <div className="name-inputs">
                    <TextInput
                        id="firstName"
                        label="First name"
                        value={userEdit.firstName}
                        onChange={(e) => setUserEdit({ ...userEdit, firstName: e.target.value })}
                        error={errors.firstName} />
                    <TextInput
                        id="lastName"
                        label="Last name"
                        value={userEdit.lastName}
                        onChange={(e) => setUserEdit({ ...userEdit, lastName: e.target.value })}
                        error={errors.lastName} />
                </div>
                <TextInput
                    id="email"
                    label="Email"
                    value={userEdit.email}
                    onChange={(e) => setUserEdit({ ...userEdit, email: e.target.value })}
                    error={errors.email} />
                <PasswordInput
                    id="password"
                    label="New password"
                    value={userEdit.password}
                    onChange={(e) => setUserEdit({ ...userEdit, password: e.target.value })}
                    error={errors.password} />
                <button className="new-blog-submit-button" type="submit">
                    <div>
                        <span className="material-symbols-outlined login-submit-icon">post_add</span>
                        Submit
                    </div>
                </button>
            </form>
        </Modal>
    );
};

export default EditUserModal;