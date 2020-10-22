import React,{useState,useEffect} from 'react'

function PlaceOrder(props){

    const popUpStyle={
      'position' : 'absolute' ,
      'left' : '80%',
      'top' : '5%' ,
      'heigth' : '100px',
      'width' : '300px',
      'delay' : {
          'hide' : '1000'
      },
      'background' : '#79EF35'

    }

    const [Isloading , setLoading] = useState(true)
    const [states , setStates]=useState('')
    const [id] = useState(props.match.params.id)
    const [orderIsPlaced , setOrderIsPlaced] = useState(false)


    useEffect(()=>{
        fetchData(id)      
        async function fetchData (id){
        const url = 'https://sisi-api-store.herokuapp.com/order/' + id
        const data = await fetch(url)
        const data_json = await data.json()
        const states = Object.keys(data_json.states)
        const allStaes = states.map((state)=>{
            return <option key={state}>{data_json.states[state]} </option>
        })
        setStates(allStaes)
        setLoading(false)
    }
    },[id])

    async function  handleOrderPlacement(e){
      e.preventDefault()
      const data = new FormData()
      
      data.append('first',e.target.First.value)
      data.append('last',e.target.Last.value)
      data.append('phone',e.target.Phone.value)
      data.append('email',e.target.Email.value)
      data.append('address',e.target.Address.value)
      data.append('address2',e.target.Address2.value)
      data.append('city',e.target.City.value)
      data.append('zip',e.target.zip.value)
      data.append('state',e.target.state.value)

      for(const key of data.entries()){
        console.log(key[0],key[1]) 
      }
      const url = 'http://localhost:4000/order/' + id
      
      //const url = 'https://sisi-api-store.herokuapp.com/order/' + id
      const res = await fetch(url,{body: data,method:"post",})
      const res_json= await res.json()
      setOrderIsPlaced(res_json.order)
    }
    
    const OrderConfurmation =(succesfull) =>{
      if(succesfull){
        return(
          <div className='popUpConfrumation' style={popUpStyle}>
             <p> Your Order was sucessfull </p></div>
        )
      }
    }
    
  


    const formInpits = ['First' , 'Last' , 'Phone' , 'Email' ,'Address','Address2' ,'City'].map((el,index)=>{
      return(
      
      <div className="form-group col-md-6">
      <label htmlFor="inputPassword4">{index<2?el+" Name":el}</label>
      <input
        type="text"
        className="form-control"

        placeholder={index<2?el+" Name":el}
        name={el}
      />
    </div>   
    )})

    
    if(Isloading) return(<h1>Loading</h1>)

    return(   
    <div className="container mt-5">
      {OrderConfurmation(orderIsPlaced)}
    <form onSubmit={handleOrderPlacement} method="post">
      <div className="form-row">
      {formInpits}
        
        <div className="form-group col-md-4">
          <label htmlFor="inputState">State</label>
          <select id="inputState" className="form-control" name="state">
           {states}
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputZip">Zip</label>
          <input type="text" name="zip" className="form-control" id="inputZip" />
        </div>
      </div>
      <div className="form-group">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
            Check me out
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Buy</button>
    </form>
  
    </div>
    )
}

export default PlaceOrder