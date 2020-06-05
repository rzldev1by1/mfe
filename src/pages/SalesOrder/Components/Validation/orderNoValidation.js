import axios from 'axios'
import {endpoint, headers,} from 'components/ConfigEndpoint'

const orderNoValidation = (order_no, client, Validation) => {
    let valid = false
    return axios.post(endpoint.orderCheck, {        
            "order_no":order_no,
	        "client":client,

        headers:headers
    })
    .then(res => {
        const available = res.data.message
        if(available == 'available') valid = true
        if(available == 'not available') valid = false
        return valid
    })
    .catch((error) => {
       return false
    })
}

export {orderNoValidation}