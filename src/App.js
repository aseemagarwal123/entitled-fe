import React, { Component } from 'react'
import './App.css'
import 'antd/dist/antd.css'; 
import SignIn from './component/form'
import { Button } from 'antd'
class App extends Component {
    render() {
        return (
            <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <div className="authentication-background">
                    <div className="authentication-background-overlay" ></div>
                    <div className="overlay-text">
                      
                    </div>
                </div>
                <div className="authentication-form-body" >
                    <SignIn />
                </div>
            </div>
        )
    }
}

export default App