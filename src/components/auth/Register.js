import React, { useState } from 'react';
import '../../../src/App.css';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

const Register = () => { 

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersRef, setUsersRef] = useState(firebase.database().ref('users'));
    const history = useHistory();

    const handleChange = (e) => {
        if(e.target.name === "username"){
             setUserName(e.target.value);
        }
        if(e.target.name === "email"){
              setEmail(e.target.value)
        }
        if(e.target.name === "password") {
             setPassword(e.target.value)
        }
        if(e.target.name === "passwordConfirmation") {
             setConfirmPassword(e.target.value)
        }
    }
    
    const isFormValid = () => {
        if(isFormEmpty()) {
            setErrors(["Complete all the fields"])
            console.log(errors, "the errors array");
            return false;
        } else if(!isPasswordValid()) {
            setErrors(["Your passwords do not match"])
            return false;
        } else {
            return true;
        }
    }

    const isFormEmpty = () => {
        return userName === '' || email === '' || password === '' || confirmPassword === '';
    }

    const isPasswordValid = () => {
          return password === confirmPassword && password.length > 6
    }

    const handleInputError = (errors, inputName) => {
       return errors.some(error => error.toLowerCase().includes(inputName)) ? 'error': ''
    }

    const saveUser = (createdUser) => {
        return usersRef.child(createdUser.user.uid).set({
            name:createdUser.user.displayName,
            avatar:createdUser.user.photoURL
        })
    }

    const handleSubmit = (e) => {
         e.preventDefault(); 
         if(isFormValid()) {
             setErrors([]);
             setLoading(true);
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
            console.log(createdUser);
            setLoading(false)
            createdUser.user.updateProfile({
                displayName:userName,
                photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })
            .then(() => {
                console.log(createdUser, "the created user after update");
                    saveUser(createdUser).then(()=> {
                        console.log('user saved');
                        history.push('/login');
                    })
            })
        }).catch(err => {
            setLoading(false);
            setErrors([err.message]);
        })
    }
}

   

        return (
              <Grid textAlign="center" verticalAlign="middle" className="app">
                  <Grid.Column style={{ maxWidth: 450}}>
                      <Header as="h2" icon color="orange" textAlign="center">
                          <Icon name="puzzle piece" color="orange" />
                          Register For Developer Chat
                      </Header>
                      <Form onSubmit={handleSubmit} size="large">
                          <Segment>
                      <Form.Input 
                      fluid name="username" icon="user" iconPosition="left"
                          placeholder="Username" onChange={handleChange} type="text" value={userName}/>
                     <Form.Input className={handleInputError(errors, "email")}
                     fluid name="email" icon="mail" iconPosition="left"
                          placeholder="Email Address" onChange={handleChange} type="text" value={email} />
                     <Form.Input className={handleInputError(errors, "password")} fluid name="password" icon="lock" iconPosition="left" value={password}
                          placeholder="Password" onChange={handleChange} type="text" />
                     <Form.Input className={handleInputError(errors, "password")} fluid name="passwordConfirmation" icon="repeat" iconPosition="left"
                          placeholder="Confirm Password" onChange={handleChange} type="text" value={confirmPassword} />

                          <Button disabled={loading} className={loading ? 'loading':'' }color="orange" fluid size="large">Submit</Button>
                          </Segment>
                      </Form>
                  {errors.size !==0 && errors.map(error => (
                      <Message className='error'>{error}</Message>
                  ))}
         
                     
                      <Message>Already a user<Link to="/login"></Link></Message>
                  </Grid.Column>

              </Grid>
    );
  }

export default Register;