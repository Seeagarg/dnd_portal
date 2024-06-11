import React,{useState} from 'react'
import classes from './LoginPage.module.css'
import Layout from '../Layouts/Layout'
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import axios from 'axios'
  import {useNavigate} from 'react-router-dom'

const LoginPage = () => {

  const [number,setNumber] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!number || !password){
      toast.warn("Enter UserName and Password!!");
    }

    const data = {
      number : number,
      password: password
    }

    try{
      const res = await axios.post('http://localhost:5000/login',data);
      console.log(res.data);
      if(res.data.status == 1){
        toast.success(res.data.message)
        localStorage.setItem('user',number)
        navigate('/')
      }
      else{
        toast.error(res.data.message)
      }

    }
    catch(err){
      console.log(err)
    }

    setNumber("")
    setPassword("")

  }


  return (
   
    <Layout>
    <form  className={classes.form_container}>
    <p className={classes.header}>Login to Your Account</p>
    <div className={classes.input_container}>
    <label htmlFor="" className={classes.label}><PersonIcon/> {" "} Enter Your Number</label>
    <input type="tel" className={classes.input} placeholder="number" value={number} onChange={(e)=>setNumber(e.target.value)}/>
    </div>
    <div className={classes.input_container}>
    <label htmlFor="" className={classes.label}> <HttpsIcon/> {" "} Enter Password</label>
    <input type="password" className={classes.input} placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <button className={classes.btn} onClick={handleSubmit}>submit</button>
    </form>
    <ToastContainer/>
    </Layout>
  )
}

export default LoginPage
