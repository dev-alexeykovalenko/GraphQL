import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../Graphql/Mutation';

function CreateUser() {

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, { error }] = useMutation(CREATE_USER);

    return (
        <div className="createUser">
            <input
                type="text"
                placeholder="name"
                onChange={(event) => {
                    setName(event.target.value)
                }}
            />
            <input
                type="text"
                placeholder="username"
                onChange={(event) => {
                    setUserName(event.target.value)
                }}
            />
            <input
                type="text"
                placeholder="password"
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
            />
            <button
                onClick={() => {
                    createUser({
                        variables: { 
                            name, 
                            username: userName, 
                            password 
                        }
                    });
                }}
            >
                Create user
          </button>
        </div>
    )
}

export default CreateUser;
