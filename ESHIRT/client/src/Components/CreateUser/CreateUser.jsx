import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Style from './CreateUser.module.css';


function CreateUser() {
    const [input, setInput] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        country: '',
        city: '',
        adress: '',
        phone: '',
    });

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name
        setInput({
            ...input,
            [name]: value
        });
    }

    async function handleSubmit(e){
        alert('User Created')
        let user={};
          await axios({
              method:'post',
              url:'http://localhost:3001/user',
              data:
              user={
                  ...input
              }
            })
        }

    return(
        <div className={Style.container}>
            <h1 className= {Style.createTitle}>Create your user</h1>
            <h2 className= {Style.createTitle2}>Quick and easy.</h2>

<form onSubmit= {handleSubmit} action='http://localhost:3000/home' className= {Style.containerForm}>
                 <input name = 'name' className= {Style.name} type = 'text' placeholder= 'Name:' onChange= {handleChange} required/>
                 <input name = 'lastname' className= {Style.lastname} type = 'text' placeholder= 'Lastname:' onChange= {handleChange} required/>
                 <input name = 'email' className= {Style.email} type = 'email'  placeholder= 'Email:' onChange= {handleChange} required/>
                 <input name = 'password' className= {Style.password} type = 'text'  placeholder= 'Password:' onChange= {handleChange} required/>
                 <input name = 'country' className= {Style.country} type = 'text' placeholder= 'Country:' onChange= {handleChange} required/>
                 <input name = 'city' className= {Style.city} type = 'text' placeholder= 'City:' onChange= {handleChange} required/>
                 <input name = 'adress' className= {Style.adress} type = 'text' placeholder= 'Adress:' onChange= {handleChange} required/>
                 <input name = 'phone' className= {Style.phone} type = 'number' placeholder= 'Phone:' onChange= {handleChange} required/>
                 <button type='submit'className= {Style.create} href='/home' >Create</button>
                    </form>
        </div>
    )
}

export default CreateUser;