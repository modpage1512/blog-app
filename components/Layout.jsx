import React from 'react'
import { Header } from "./"
import Link from 'next/link'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    )
}

export default Layout
