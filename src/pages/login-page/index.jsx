import { useRef, useState } from 'react';
import {Button, Row, Col, Form} from 'react-bootstrap';
import useApi from '../../hooks/useApi';
import { toast } from 'react-toastify';
import { AuthTokenContext } from '../../components/context/auth-token-context-provider';
import { useContext } from 'react';

export default function LoginPage(){
const api= useApi()
const AuthTokenContextValue = useContext(AuthTokenContext)

// 1-useState Yöntemi:
const[email, setEmail]= useState("")
const[password, setPassword] = useState("");
console.log("1-useState hook yöntemi:", email, password);

//2- useRef hook yöntemi:

const emailRef = useRef();
const passwordRef =useRef();
console.log("2-useRef yöntemi", emailRef, passwordRef);
//useRef yöntemi{current: input.form-control} konsolun çıktısı bu ifade
console.log("emailRef.current.value:", emailRef.current?.value);
console.log("passwordRef.current.value:", passwordRef.current?.value)

//3 Formun JSON'a çevvrilerek alınması

 const onFormSubmit = (event)=>{
    event.preventDefault();

    //toast("Form submit oluyor");
    
const formData = new FormData(event.target)
const formJson = Object.fromEntries(formData.entries());
console.log('>>Form Json datası', formJson)

api.post("auth/login", formJson)
.then((response)=>{
    console.log(">>Api Resp", response);
    AuthTokenContextValue.setToken(response.data.data.token);
    response.data.data.token

    toast("Successfully logged in");
})
.catch((err)=>{
    console.log(err);
    toast.error('Please check your email and password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

})
 }
return(
        <>
            <form onSubmit={onFormSubmit}>
                <Row className="justify-content-center">
                    <Col sm="12" lg="4">
                        <div className='form-group mb-3'>
                            <Form.Label>
                                E-mail
                            </Form.Label>
                            <Form.Control 
                            ref={emailRef}
                            type="email" 
                            name="email"
                            onChange={(event)=>setEmail(event.target.value)} 
                            />
                            
                        </div>

                        <div className='form-group mb-3'>
                            <Form.Label>Şifre:</Form.Label>
                            <Form.Control
                           ref={passwordRef}
                            type="password"
                            name="password" 
                            onChange={(event)=>setPassword(event.target.value)}
                            />
                            
                        </div>
                        <div className='form-group mb-3'>
                            <Button variant="success" className='w-100' type="submit"> <i class="fa-sharp fa-solid fa-paper-plane"></i> Send</Button>
                        </div>
                    </Col>

                </Row>
            </form>
        </>
    )
}