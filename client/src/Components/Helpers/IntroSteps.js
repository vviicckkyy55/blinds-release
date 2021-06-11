import React from 'react'

export default function IntroSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={ props.step1 ? 'active' : '' }>Login Intro</div>
      <div className={ props.step2 ? 'active' : '' }>User Details</div>
      <div className={ props.step3 ? 'active' : '' }>Banking Details</div>
      <div className={ props.step4 ? 'active' : '' }>Business Details</div>
    </div>
  )
}
