import React, { Component } from 'react'
import { Form, Input, Button, Spin, message, InputNumber } from 'antd';
import axios from 'axios'
class SignIn extends Component {
    state = {
        loading: false,
        message: false,
        type:false
    }
    onFinish = (data) => {
        this.setState({
            loading: true,
            message: false,
            
        })
        console.log(data)
        axios.post('https://entitled.herokuapp.com/api/v1/loan', data).then((response) => {
            message.success(response.data.message)
            this.setState({
                loading: false,
                message: response.data.message,
                type:"success"
            })
        }).catch(err => {
            this.setState({
                loading: false,
                message: err.response.data.message,
                type:"fail"
            })
            message.error(err.response.data.message)
        })
    }
    onFinishFailed = (data) => {

    }

    render() {
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
        return (
            <div className="form-body">
                <center>
                    <h2>Entitled Solution</h2>
                </center>
                <br /> <br />
                <Form
                    style={{ padding: "5% 10%" }}
                    name="basic"
                    validateMessages={validateMessages}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14, offset: 2 }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Name is required" }]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        name="pan"
                        label="PAN Number"
                        rules={[{ required: true, pattern: new RegExp(/[A-Z]{5}[0-9]{4}[A-Z]{1}/), message: "Invalid PAN" }]}
                    >
                        <Input placeholder="PAN Number" />
                    </Form.Item>
                    <Form.Item
                        name="emp_id"
                        rules={[{ required: true }]}
                        label="Employee ID"
                    >
                        <Input placeholder="Employee ID" />
                    </Form.Item>
                    <Form.Item
                        name="amt_req"
                        rules={[{ type: "number", required: true, message: "Invalid Amount" }]}
                        label="Amount Required"
                    >
                        <InputNumber style={{ width: "100%" }} placeholder="Amount Required" />
                    </Form.Item>
                    <Form.Item
                        name="num_emis"
                        rules={[{ type: "number", required: true, message: "Invalid Number" }]}
                        label="Number of EMI"
                    >
                        <InputNumber style={{ width: "100%" }} placeholder="Number of EMI" />
                    </Form.Item>

                    <center>
                        <Form.Item wrapperCol={{ span: 14, offset: 3 }}>
                            {this.state.loading ? <Spin tip="loading ..." ></Spin> :
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>}
                        </Form.Item>
                    </center>
                    <br />
                    <i style={this.state.type == "success" ? {color:"green"}:{color:"red"}}> {this.state.message} </i>
                </Form>


            </div>
        )
    }
}

export default SignIn
