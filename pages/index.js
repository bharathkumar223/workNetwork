import Head from 'next/head'
import validator from 'validator' 
import { useState } from 'react'

export default function Home() {
  const [phoneValidation, setPhoneValidation] = useState(false)
  const [otpValidation, setOtpValidation] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [hideOtp,setHideOtp] = useState(false)
  const [defaultPhone,setDefaultPhone] = useState("")
  const [defaultOtp,setDefaultOtp] = useState("")

  function validatePhoneNumber (number) {
    const isValidPhoneNumber = validator.isMobilePhone(number,['hi-IN','bn-IN','en-IN'],'+91')
    return (isValidPhoneNumber)
   }

  function ProcessPhoneNumber() {
    const registerUser = event => {
      event.preventDefault() 
      var phone = event.target.name.value;
      if (typeof phone !== "undefined") {
        if(validatePhoneNumber(phone)){
          setPhoneError("")
          setPhoneValidation(true)
        }else{
          setPhoneError("Please enter valid indian phone")
        }
      }
      setDefaultPhone(phone)
    }
  
    return (
      <form onSubmit={registerUser}>
        <label style={{marginLeft:'474px'}} htmlFor="name">Phone Number  </label>
        <input id="name"   
               defaultValue={defaultPhone} 
               type="phone" 
               style={{marginLeft:'2vw'}} 
               autoComplete="name" 
               required/>
        <button  className = "btn" 
                 type="submit" 
                 style={{marginLeft:'610px',marginTop:'3vh',
                        backgroundColor:'#0070f3',
                        color:'white',
                        border:"none",
                        padding:'10px',
                        fontFamily:'sans-serif',
                        borderRadius:'4px',
                        cursor:'pointer',
                        }}
                  >Sign Up Mobile</button>
        <h4 style={{color:'red',marginLeft:'610px'}}>{phoneError}</h4>
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
          <button type="submit" 
                  style={{marginLeft:'8vw',marginTop:'3vh',
                          backgroundColor:'#0070f3',
                          color:'white',
                          border:"none",
                          padding:'4%',
                          fontFamily:'sans-serif',
                          borderRadius:'4px',
                          cursor:'pointer'}}>Validate OTP</button>
          <h4 style={{color:'red',marginLeft:'8vw'}}>{otpError}</h4>
        </>}
          {otpValidation?<LoginSuccess/>:""}
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
