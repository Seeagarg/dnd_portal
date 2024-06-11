import React,{useState,useEffect} from 'react'
import classes from './HomePage.module.css'
import Layout from '../Layouts/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Lottie from 'lottie-react'
import Loader from '../Animations/Loader.json'
const HomePage = () => {

  const [file,setFile] = useState(true)
  const [number,setNumber] = useState('');
  const [loading,setLoading] = useState(false);
  const [selectedFile,setSelectedFile] = useState()
  const navigate = useNavigate();
  // console.log(number,selectedFile);

  const user = localStorage.getItem('user');

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [])


  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
    if(!file && !number ){
      toast.error("Please enter Your Number")
      setLoading(false)
    }
    else if( file && !selectedFile ){
      toast.error("Please select file")
      setLoading(false)
    }

    

    if(file && selectedFile){
      const fileData = new FormData();
      fileData.append('file',selectedFile)

      try{
        const res = await axios.post('http://localhost:5000/dnd_file',fileData)
        console.log(res);
        setLoading(false)
        toast.success("File Uploaded Successfully!!")
        setSelectedFile('')

      }
      catch(err){
        console.log(err)
      }
    }
    else if(!file && number){
      const data = {
        ani : number
      }
     try{
      const res = await axios.post('http://localhost:5000/number',data)
      console.log(res)
      setLoading(false)
      toast.success("Number Uploaded Successfully!!")
      setNumber('')
     }
     catch(err){
      console.log(err)
     }
    }

  }

  return (
    <Layout>
    <form className={classes.form_container}>
    <p className={classes.header}> Enter Number or Input a file</p>
    <hr />
    <div className={classes.select}>
   
        <label  className={classes.radio_btn}>
            <input type="radio"  value="file" id="option2" checked={file} onClick={()=>setFile(true)}/>
          <p> {"     "} file</p>
            </label>
            <label className={classes.radio_btn}>
            <input type="radio" value="number" id="option1"  checked={!file} onClick={()=>setFile(false)}/>
           <p> {"    "}number</p>
        </label>
      </div>
      <hr />
{
  file ?
  <div className={classes.file_input}>
  <label htmlFor="">{selectedFile ? selectedFile.name : "Choose File"}</label>
  <input type="file" accept="text/plain" disabled={!!selectedFile} className={classes.input} onChange={(e)=>setSelectedFile(e.target.files[0])} />
      </div>
  
:

      <div className={classes.number_input}>
      <label htmlFor="Enter Number">Enter Number</label>
  <input type="tel" placeholder="Number"  className={classes.input} onChange={(e)=>setNumber(e.target.value)} />
</div>

}

{
  !loading ?
  <button className={classes.btn} onClick={handleSubmit}>Submit</button>
  :
  <Lottie
    animationData = {Loader}
    className={classes.animation}
  />
}

      
    </form>
    <ToastContainer/>
    </Layout>
  )
}

export default HomePage
