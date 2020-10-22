import React from 'react'
import {Button ,Popup} from 'semantic-ui-react'

const OrderConfurmation = (event) =>  (
    <Popup 
        content='Order was Succesfully placed'
        trigger={event}
        position='top right'
        />


)

export default OrderConfurmation