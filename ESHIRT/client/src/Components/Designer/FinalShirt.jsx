import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FinalCSS from './FinalShirt.module.css';
import img from '../../assets/img/random_remera_front.png';
import {fabric} from 'fabric';
import { postShirt, resetErrors, postFavorite } from '../../Actions/index.js';
import {useHistory} from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {getCategories} from '../../Actions/index';
import swal from 'sweetalert';
export default function FinalShirt(props) {

    const {phase} = props;
    const errors = useSelector((state) => state.globalReducer.errors);
    const postOk = useSelector((state) => state.shirtReducer.shirtPostOk)
    const categories = useSelector((state)=> state.categoryReducer.allCategories)
    const dispatch= useDispatch();
    const [input, setInput] = useState({name: '', public: "false", categories: []});
    const [input2, setInput2] = useState('');
    const history = useHistory()
    const { user, isAuthenticated, loginWithPopup } = useAuth0();
    
    const setColorName = (color) => {
        switch(color) {
            case 'rgb(12, 155, 255)':
                return 'lightblue';
            case 'rgb(10, 10, 255)':
                return 'blue';
            case 'darkorchid':
                return 'purple';
            case 'rgb(20, 20, 20)':
                return 'black';
            case 'rgb(255, 255, 255)':
                return 'white';
            default:
                return color
        }
    }

    useEffect(() => {
      /*   console.log(errors)
 */
        if(categories.length < 1) {
            dispatch(getCategories());
        }

        if (errors) {
            // alert(`${errors.message}`)
            dispatch(resetErrors()) 
        } else if (postOk) {
            // alert('Shirt created!')
            // history.push('/catalogue')
        }
    })

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name
        if(name === 'categories') {
            setInput(prevState => {
                return {
                    ...prevState,
                    [name]: prevState[name].includes(parseInt(e.target.value)) ? prevState[name] : [...prevState[name], parseInt(e.target.value)]
                }
            })
            return;
        }
        setInput(prevState => {
            return {
            ...prevState,
            [name]: value
        }});

        return;
    }
    /* function handlePublic(e) {
        const value = e.target.value;
        const name = e.target.name

        setInput2(
            value
        );

        return;
    } */
        

    async function handleSubmit (e, phase) {
        
        e.preventDefault();
        if(isAuthenticated) {
                dispatch(postShirt( 
                    {
                        userId: user.sub.split('|')[1],
                        name: input.name,
                        print: phase.designSelected.data,
                        size: phase.sizeSelected.data,
                        color: setColorName(phase.colorSelected.data),
                        public: input.public,
                        model: phase.modelSelected.data,
                        categories: input.categories,
                    }
                ))
                swal({ 
                    title: "Shirt Created", 
                    text: "The administrator will approve your design in the next few minutes",
                    icon: "success",
                    timer: 3000,
                    padding: "0.75rem"
                    });
                    history.push('/catalogue')
               

                return;
        } else {
            return loginWithPopup();
        }


        //history.push('/catalogue')
    }

    return (
        <div className={FinalCSS.container}>
            <div className={FinalCSS.finalShirt}>
                {/* <canvas id="canvas" /> */}
                <img src={props.phase.designSelected.data}/>
            </div>
            <div className={FinalCSS.submitContainer}>
                <div className={FinalCSS.uploadText}>
                    <h3>Do you like your shirt? Upload your design!</h3>
                </div>
                <div className={FinalCSS.uploadForm}>
                    <form onSubmit={(e)=> handleSubmit(e, phase)}>
                    <label for="name">Choose a name for your shirt</label>
                    <input name = 'name'  type='text' placeholder= 'Name of your shirt' onChange= {handleChange} required/>
                    <div>
                        <label for="categories"> The category of your shirt: </label>
                        <select onChange={handleChange} name="categories">
                            {categories.map((elem, index) => 
                            (<option value={elem.id} key={index}>{elem.name}</option>))}
                        </select>
                    </div>
                    <div className={FinalCSS.Desing}> Do you want to share your design?</div>
                    <div className={FinalCSS.shareOptions}>
                        <label className={FinalCSS.Desing1}>Yes</label>
                        <input type="radio" name="public" value="pending" onChange= {handleChange}/>
                        <label className={FinalCSS.Desing2}>No</label>
                        <input type="radio" name="public" value="false" onChange= {handleChange}/>
                    </div>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>

    )
}