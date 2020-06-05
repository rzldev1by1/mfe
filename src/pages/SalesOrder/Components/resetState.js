import helpers from 'helpers'
import moment from 'moment'
const reset = (props) => {
    return {
        header: {
            company             : helpers.getCompanyCode(),            
            site                : null,  
            siteVal             : null,
            client              : helpers.getClient(),       
            orderId             : null,
            customerOrderRef    : null,
            vendorOrderRef      : null,
            orderType           : null,
            orderTypeVal        : null,
            deliveryDate        : moment().format('YYYY-MM-DD'),
            customer            : props.identity ? props.identity[0].name : null,
            customerVal         : props.identity ? props.identity[0].customer_no : null,
            shipToAddress1      : props.identity ? props.identity[0].address_1 : null,
            shipToAddress2      : props.identity ? props.identity[0].address_2 : null,
            shipToAddress3      : props.identity ? props.identity[0].address_3 : null,
            shipToAddress4      : props.identity ? props.identity[0].address_4 : null,
            shipToAddress5      : props.identity ? props.identity[0].address_5 : null,
            city                : props.identity ? props.identity[0].city : null,
            postCode            : props.identity ? props.identity[0].postcode : null,
            state               : props.identity ? props.identity[0].state : null,
            country             : props.identity ? props.identity[0].country : null, 
            deliveryInstruction : null,
          },
          lineDetail: [
            {
              number           : 1,
              productVal       : null,
              product          : null,
              qty              : null,
              weight           : null,
              uom              : null,
              rotaDate         : null,
              batch            : null,              
              ref3             : null,
              ref4             : null,
              dispositionVal   : null,
              disposition      : null,
              packId           : null,
            }
          ],
        }
    }

    const errMsg = {
      header: {
        emptySite: null,
        emptyClient: null,
        emptyOrderType: null,
        emptyOrderNo: null,
        emptyDeliveryDate: null,

        emptyCustomer: null,
        emptyShipToAddress1: null,
        emptyPostCode: null,
        emptyState: null
      }
    }

    export {reset, errMsg}
    