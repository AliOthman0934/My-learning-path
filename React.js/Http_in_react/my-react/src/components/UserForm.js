import React,{useRef} from 'react';
import './UserForm.css';

function UserForm(props){
    let fNameRef = useRef()
    let lNameRef = useRef()
    let emailRef = useRef()
    let passwordRef = useRef()
    let cRef = useRef()
    let cityRef = useRef()
    let dataRef = useRef()

    function onSubmitForm(event){
        event.preventDefault();
        let user ={
            firstName : fNameRef.current.value,
            lastName : lNameRef.current.value,
            userEmail : emailRef.current.value,
            userPassword : passwordRef.current.value,
            userCountry: cRef.current.value,
            userCity : cityRef.current.value,
            userData: dataRef.current.value
        }
        props.onCreatUser(user);
    }
    return <>
            <div id="myModal" class="modal">
                    <div class="modal-content">
                        <div class="close" onClick={props.closeForm}>&times;</div>
                        <h3>Create new user</h3>
                        <div class="user-form">
                            <form onSubmit={onSubmitForm}>
                                <div>
                                    <input type="text" placeholder="First name" ref={fNameRef}  />
                                    <input type="text" placeholder="Last name" ref={lNameRef} />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email" ref={emailRef} />
                                </div>
                                <div>
                                    <input type="password" placeholder="Password" ref={passwordRef} />
                                    <input type="password" placeholder="Confirm Password"  />
                                </div>
                                <div>
                                    <select name="country" ref={cRef} >
                                        <option value="India">India</option>
                                        <option value="Germany">Germany</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                    <select name="city"  ref={cityRef}>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Berlin">Berlin</option>
                                        <option value="New York">New York</option>
                                        <option value="London">London</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="date" placeholder="Date of Birth" ref={dataRef} />
                                    <select name="gender" >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                </div>
                                <button className='add-user-button'>{props.editMode ? 'Update User' : 'Create User'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
}

export default UserForm;