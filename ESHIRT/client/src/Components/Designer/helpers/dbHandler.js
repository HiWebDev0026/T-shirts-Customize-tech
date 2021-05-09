import axios from 'axios';

const submitToDB = async (e, phase) => {
    e.preventDefault();


            try {

                
                await axios({
                method: "POST",
                url: 'http://localhost:3001/shirt',
                data: {
                    userId: 1,
                    name: 'kjnjhgffhjkiyz',
                    print: phase.designSelected.data,
                    size: phase.sizeSelected.data,
                    color: phase.colorSelected.data,
                    model: phase.modelSelected.data,
                }
                })
                .then(res => console.log(res.data))

            } catch(err) {
                console.log(err);
            }
}

export default submitToDB;
