import React from 'react';


function StandardShirts(props) {



    return (
        <div style={{display: 'flex', border: '1px solid black', flexWrap: 'wrap',width: '100%', height: '100%',justifyContent: 'space-around'}}>
            {[1, 2, 3, 4].map((elem,index) => {

                return (
                    <div key={index}style={{minHeight: '90%', border: '1px solid black', textAlign: 'center', width: '20%', minWidth: '6em'}}>
                        Remera {index+1}
                    </div>
                )
            })} 
        </div>
    )
}


export default StandardShirts;