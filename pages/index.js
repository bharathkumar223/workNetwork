import Head from 'next/head'
import { useState,useEffect } from 'react'
import { isValidPhoneNumber } from 'libphonenumber-js'

const countryCodes = require('country-codes-list')
const myCountryCodesObject = countryCodes.customList('countryNameEn', 
                                                     '{countryNameEn}:{countryCode}: +{countryCallingCode}')


export default function Home() {
  const [phoneValidation, setPhoneValidation] = useState(false)
  const [otpValidation, setOtpValidation] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [hideOtp,setHideOtp] = useState(false)
  const [defaultPhone,setDefaultPhone] = useState("")
  const [defaultOtp,setDefaultOtp] = useState("")
  const [countryCode,setCountryCode] = useState([])
  const [optionValue, setOptionValue] = useState("");

  useEffect(() => {
    setCountryCode(Object.values(myCountryCodesObject))
    return () => {
    }
  }, [])

  function validatePhoneNumber (number) {
    return isValidPhoneNumber(number, optionValue.split(':')[1]) === true
   }

  function ProcessPhoneNumber() {
    
    const registerUser = event => {
      event.preventDefault() 
      var phone = event.target.name.value;
      if (typeof phone !== "undefined") {
        if(validatePhoneNumber(phone)){
          setPhoneError("...Sending OTP to "+phone)
          setTimeout(()=>{
            setPhoneError("")
            setPhoneValidation(true)
          },2000)
        }else{
          setPhoneError("Please provide a valid mobile number")
          setTimeout(()=>{setPhoneError("")},1500)
        }
      }
      setDefaultPhone(phone)
    }
    const handleSelect = (e) => {
      console.log(e.target.value);
      setOptionValue(e.target.value);
    };

    const splitInfo = (info,index) => {
      return info.split(":")[index]
    }

    return (
      <form onSubmit={registerUser}>
        <div className="phone-validation">
          <select className="phone-select" onChange={handleSelect} value={optionValue}>
          <option className="phone-option">select your country</option>
          {countryCode.map((country, index) =>
                  <option
                    key={index}
                    value={country}
                    >{splitInfo(country,0)+' ('+splitInfo(country,2)+')'}</option>
                )}
          </select>
        </div>
        {optionValue?<>
          <input id="name"   
                defaultValue={defaultPhone} 
                type="phone" 
                autoComplete="name" 
                placeholder="Enter the phone number"
                required/>
          <button  className = "btn" 
                   type="submit">Send OTP</button>
          <h4>{phoneError}</h4>
        </>:null}
        <style jsx>{`
          div.form
          {
              display: block;
              text-align: center;
          }
          form
          {
              display: inline-block;
              margin-left: auto;
              margin-right: auto;
              text-align: center;
              
          }
         .phone-select{
            max-width: 50%;
            height: 100%;
            padding: 3rem;
            margin-bottom: 1rem;
            margin: 20px;
            width: 850px;
            padding: 5px 35px 5px 5px;
            font-size: 16px;
            border: 1px solid #CCC;
            height: 34px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            cursor:pointer;
            border-radius:3px;
         }
         input{
            max-width: 50%;
            height: 100%;
            padding: 3rem;
            margin-bottom: 1rem;
            margin: 10px;
            width: 220px;
            padding: 5px 35px 5px 5px;
            font-size: 16px;
            border: 1px solid #CCC;
            border-radius:3px;
            height: 34px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
         }
         .btn{
            background-color:#0070f3;
            color:white;
            border:none;
            padding:10px;
            font-family:sans-serif;
            border-radius:4px;
            cursor:pointer;
         }
         h4{
          color:#0070f3;
          text-align:center
         }
        `}</style>
      </form>
    )
  }

  function OtpValidate() {
    
    const validateOtp = event => {
      event.preventDefault()
      var otp = event.target.otp.value;
      setOtpValidation(false)
      if (typeof otp !== "undefined") {
        console.log(otp)
        if(otp === "1111"){
          setOtpError("")
          setOtpValidation(true)
          setTimeout(()=>{setHideOtp(true)},3000)
        }else{
          setOtpError("Entered Otp is invalid")
          setTimeout(()=>{setOtpError("")},1300)
        }
      }
      setDefaultOtp(otp)
    }

    function maxLengthCheck (object) {
      if (object.target.value.length > object.target.maxLength) {
        object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }
  
    return (
      <form onSubmit={validateOtp}>
        {hideOtp?"":<>
        <label htmlFor="name">Enter OTP   </label>
        <input id="otp" 
               defaultValue={defaultOtp} 
               style={{marginLeft:'2vw'}} 
               type={otpValidation?"number":"password"}  
               autoComplete="name" 
               required 
               maxLength = "4" 
               onInput={maxLengthCheck}/><br/><br/></>}
        {otpValidation?"":<>
          <button type="submit">Validate OTP</button>
          <h4 style={{color:'red',marginLeft:'8vw'}}>{otpError}</h4>
        </>}
          {otpValidation?<LoginSuccess/>:""}
          <style>{`
            button{
              margin-left:8vw;
              margin-top:3vh;
              background-color:#0070f3;
              color:white;
              border:none;
              padding:4%;
              font-family:sans-serif;
              border-radius:4px;
              cursor:pointer
            }
          `}</style>
        </form>
    )
  }

  function LoginSuccess() {
    return (
        <h1 style={{color:'#0070f3',marginLeft:'2vw'}}>Login success</h1>
    )
  }
  
  return (
    <div className="container">
      <Head>
        <title>Work Network Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <h1 className="title">
          Welcome to <a href="https://worknetwork.ai" target="_blank">Work Network!</a>
        </h1>

        <p className="description">
          Get started by verifying mobile
        </p>
        {phoneValidation?<OtpValidate/>:<ProcessPhoneNumber/>}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by WorkNetwork
        </a>
      </footer>

      <style jsx>{`
         
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        label {margin-left:'474px'}

        * {
          box-sizing: border-box;
        }
      `}</style>
    
    </div>
  )
}
