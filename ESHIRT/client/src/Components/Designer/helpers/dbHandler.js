import axios from 'axios';

const submitToDB = async (e, phase) => {
    e.preventDefault();


    try {

        axios({
            method: "POST",
            url: 'http://localhost:3001/shirt',
            data: {
                userId: 1,
                name: 'kjnjhgffhjkiyz',
                print: phase.designSelected.data.src,
                size: phase.sizeSelected.data,
                color: phase.colorSelected.data,
                model: phase.modelSelected.data,
            }
        })

    } catch(err) {
        console.log(err);
    }
}

export default submitToDB;
