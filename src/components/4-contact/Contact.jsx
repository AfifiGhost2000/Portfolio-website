import React from 'react'
import './contact.css'
import { useForm, ValidationError } from '@formspree/react'
import Lottie from 'lottie-react'
import doneAnimation from "../../animation/done.json"
import contactAnimation from "../../animation/contact.json"

export default function Contact() {
  const [state, handleSubmit] = useForm("xrgvvdlo");

  if (state.succeeded) {
    return <h1>Thanks for joining!</h1>
  }
  return (
    <section className='contact-us'>
      <h1 className='title'>
        <span className='icon-envelope'></span>
        Contact us
      </h1>
      <p className='sub-title'>Contact us for more information and Get notified. </p>

      <div style={{ justifyContent: "span-between" }} className="flex">
        <form onSubmit={handleSubmit} className='form'>
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input autoComplete='off' required type="email" name="email" id="email" />
            <ValidationError prefix='Email' field='email' errors={state.errors} />
          </div>

          <div className="flex" style={{ marginTop: "24px" }}>
            <label htmlFor="message">Your message:</label>
            <textarea required name="message" id="message" />
            <ValidationError prefix='Message' field='message' errors={state.errors} />
          </div>

          {/* Move the submit button here, below the message textarea */}
          <div className="flex">
            <button
              type="submit"
              disabled={state.submitting}
              className='submit'
            >
              {state.submitting ? "Submitting ..." : "Submit"}
            </button>

          </div>


          {state.succeeded && (
            <p className="flex" style={{ fontSize: "18px", marginTop: "1.7rem" }}>
              <Lottie loop={false} style={{ height: 37 }} animationData={doneAnimation} />
              Your message has been sent successfully
            </p>
          )}
        </form>
        <div className="animation">
          <Lottie className="contact-animation" loop={true} style={{ height: 300, margin: 80 }} animationData={contactAnimation} />
        </div>
      </div>
    </section>
  )
}
