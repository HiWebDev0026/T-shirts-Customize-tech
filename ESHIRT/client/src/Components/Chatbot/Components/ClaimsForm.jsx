import React from 'react'
import Style from './General.module.css';

function ClaimsForm() {

    return (
        <div className={Style.form}>
            <form action="https://formsubmit.co/e.shirt2021@gmail.com" method="POST" >
				<div class="fields" className={Style.boxForm}>
				<div class="field half" className={Style.divForm}><input type="text" name="name" placeholder="Name" className={Style.inputForm} /></div>
				<div class="field half"className={Style.divForm}><input type="email" name="email" placeholder="Email" /></div>
				<div class="field"className={Style.divForm}><textarea name="message" placeholder="Message" rows="6"></textarea></div>
				</div>
				<ul class="actions special">
					<li><input type="submit" value="Send Message" /></li>
				</ul>
			</form>
        </div>
    )
}

export default ClaimsForm;