import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FinalCSS from './FinalShirt.module.css';
import img from '../../assets/img/random_remera_front.png';
import {fabric} from 'fabric';
import { postShirt, resetErrors } from '../../Actions/index.js';
import {useHistory} from 'react-router-dom';

export default function FinalShirt(props) {

    const {phase} = props;
    const errors = useSelector((state) => state.globalReducer.errors);
    const postOk = useSelector((state) => state.shirtReducer.shirtPostOk)
    const dispatch= useDispatch();
    const [input, setInput] = useState({name: ''});
    const [input2, setInput2] = useState('');
    const history = useHistory()


    useEffect(() => {
        console.log(errors)
        if (errors) {
            alert(`${errors.message}`)
            dispatch(resetErrors()) 
        } else if (postOk) {
            alert('Shirt created!')
            history.push('/catalogue')
        }
    })

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name
        setInput({
            [name]: value
        });
    }
    function handlePublic(e) {
        const value = e.target.value;
        const name = e.target.name
        setInput2(
            value
        );
    }
        

    function handleSubmit (e, phase) {
        e.preventDefault();
        dispatch(postShirt( 
            {
                userId: 1,
                name: input.name,
                print: phase.designSelected.data,
                size: phase.sizeSelected.data,
                color: phase.colorSelected.data,
                public: input2 === 'true ' ? true : false,
                model: phase.modelSelected.data,
            }
        ));
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
                    <input name = 'name'  type = 'text' placeholder= 'Name of your shirt:' onChange= {handleChange} required/>
                    <div className={FinalCSS.Desing}> Do you want to share yoor design?</div>
                    <label className={FinalCSS.Desing1}>Yes</label>
                    <input type="radio" name="public" value="true" onChange= {handlePublic}/>
                    <label className={FinalCSS.Desing2}>No</label>
                    <input type="radio" name="public" value="false" onChange= {handlePublic}/>
                   
                    

                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>

    )
}