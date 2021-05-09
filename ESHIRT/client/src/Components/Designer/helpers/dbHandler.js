import axios from 'axios';

const submitToDB = (e, phase) => {
    e.preventDefault();
    axios({
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
}

export default submitToDB;
