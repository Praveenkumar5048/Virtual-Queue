import React from 'react'
import { Hero, WhyUs, GetInTouch, Navbar, Footer } from "../import-export/ImportExport";

function Home() {
    return (
        <>  
            <Navbar />
            <Hero />
            <WhyUs />
            <GetInTouch />
            <Footer />
        </>
    )
}

export default Home;