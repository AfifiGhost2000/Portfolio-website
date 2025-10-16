import React, { useState } from 'react'
import './main.css'
import Projects from '../3c-projects/Projects'
import Articles from './Articles'
import WorkExperience from './WorkExperience'
import StayUpdated from './StayUpdated'

import { ErrorBoundary } from 'react-error-boundary';





export default function Main() {

    return (
        <section className="main">
            <div className="left-section">
                <ErrorBoundary fallback={<p>Something went wrong loading articles.</p>}>
                    <Articles />
                </ErrorBoundary>


            </div>

            <div className="right-section">
                <StayUpdated />
                <WorkExperience />

            </div>


        </section>

    )


}
