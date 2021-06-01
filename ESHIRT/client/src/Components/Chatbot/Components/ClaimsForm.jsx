import React from 'react'
import Style from './General.module.css';

function ClaimsForm() {

    return (
        <div className={Style.form}>
            <form action="https://formsubmit.co/e.shirt2021@gmail.com" method="POST" >
				<div className={Style.boxForm}>
				<div className={Style.divForm}><input type="text" name="name" placeholder="Name" className={Style.inputForm} /></div>
				<div className={Style.divForm}><input type="email" name="email" placeholder="Email" className={Style.inputForm2} /></div>
				<div className={Style.divForm}><textarea name="message" placeholder="Message" rows="6" className={Style.inputForm2} ></textarea></div>
				</div>
				<ul className={Style.formUl}>
					<li className={Style.formLi}><input className={Style.formBtn} type="submit" value="Send Message" /></li>
				</ul>
			</form>
        </div>
    )
}

export default ClaimsForm;