import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../Graphql/Mutation';

function UpdatePassword() {
    const [userName, setUserName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [updatePassword, { error }] = useMutation(UPDATE_PASSWORD);

    if (error) {
        return <h1> { error } </h1>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Username..."
                onChange={(event) => {
                    setUserName(event.target.value)
                }}
            />
            <input
                type="password"
                placeholder="Current Password..."
                onChange={(event) => {
                    setCurrentPassword(event.target.value)
                }}
            />
            <input
                type="password"
                placeholder="New Password..."
                onChange={(event) => {
                    setNewPassword(event.target.value)
                }}
            />
            <button 
                onClick={() => {
                    updatePassword({
                        variables: { 
                            username: userName, 
                            oldPassword: currentPassword, 
                            newPassword 
                        }
                    })
                }}
            >
                UPDATE PASSWORD
            </button>
        </div>
    )
}

export default UpdatePassword;
