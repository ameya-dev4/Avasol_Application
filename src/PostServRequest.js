import React from 'react'
import {useForm} from 'react-hook-form'
import '../Basic/latestServRequest.css'
import postServpic from '../../../assets/images/latestServpic.jpg'
import {GetToken} from '../../../Api/auth'
import SERVER_URL from './Server/Server'

const PostServRequest = () => {
    const user_name=localStorage.getItem('username')
    const parse_username=JSON.parse(user_name)
  const form =useForm({
    defaultValues:{
        amount:"",
        assignedBy:"",
        assignedDate:"",
        batteryId:"",
        noteToServiceEngineer:"",
        openDate:"",
        otpId:0,
        payerId:"",
        requestId:0,
        serviceEngineerId:"",
        serviceEngineerNote:"",
        shortDescription:"",
        status:0,
        trasactionId:0,
        username:parse_username,

    }
})

const batterIds=localStorage.getItem('batteryTables')
const parse_batteries=JSON.parse(batterIds)
const {register,formState,handleSubmit}=form
const {errors}=formState
 const access_token=GetToken();
const submitHandler=(event)=>{
    const jsonData = JSON.stringify(event);
const head={
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${access_token}`,
    // 'Access-Control-Allow-Origin':'http://localhost:3000'
  }

// Send the JSON data to another URL (replace 'url' with the actual URL)
fetch(`${SERVER_URL}user/add-service-request`,{
  method:'POST',
  headers:head,
  body: jsonData,

})
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data here
    console.log(data);
    console.log(head)
  })
  .catch((error) => {
    // Handle any errors here
    console.error(error);
  });

}
return (
<>
{/* <div className='outer'>
<div className='image'>
    <img src={postServpic} ></img>
</div> */}
<div className='back'>
<div className='container1'>
    <header>PostServRequest</header>
    <form action='#' noValidate onSubmit={handleSubmit(submitHandler)}>
        <div className='form-first'>
            <div className='details Personal'>
                <span class='title'>Personal Details</span>

                <div className='fields'>
                    <div className='input-fields'>
                        <label>UserName</label>
                        <input type='text' readOnly style={{cursor:'not-allowed'}} {...register('username',{
                            required:"Invalid username"
                        })} placeholder='Enter the UserName'></input>
                        <p className='error'>{errors.username?.message}</p>
                    </div>
                    <div className='input-fields'>
                        <label>BatteryId</label>
                        <select type='text' {...register('batterId',{
                                required:"missing or ivalid Id"
                            })} placeholder='Enter the BateryId'> 

                                {parse_batteries.map(eachBatt=>{
                                    return  <option>{eachBatt.batteryId}</option>
                                 })}
                            
                            
                            
                        </select>
                        <p className='error'>{errors.batteryId?.message}</p>
                    </div>
                    
                    <div className='input-fields'>
                        <label>NoteToServiceEngineer</label>
                        <input type='text' {...register('noteToServiceEngineer',{
                            required:" missing note"
                        })} placeholder='Enter the Note'></input>
                        <p className='error'>{errors.noteToServiceEngineer?.message}</p>
                    </div>

                    <div className='input-fields'>
                        <label>ShortDescription</label>
                        <textarea type='text' {...register("shortDescription",{
                            required:"missing description"
                        })} placeholder='Enter the Description'></textarea>
                        <p className='error'>{errors.shortDescription?.message}</p>
                    </div>
                    <div className='input-fields'>
                        <label>Open Date</label>
                        <input type='date' {...register('openDate',{
                            required:"missing date"
                        })} placeholder='Enter the date '></input>
                        
                    </div>
                </div>

                <button className='nextbtn'>
                    <span>Submit</span></button>

            </div>
        </div>

        
    </form>
</div>
</div>
{/* </div> */}
</>
)
}

export default PostServRequest;