import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate()
    const [error, setError] = useState<string>('');
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values)
        try {
            const body = {
                email: values.email,
                password: values.password
            }
            const res = await axios.post('http://localhost:3000/user/login', body)
            localStorage.setItem('token', res.data.data.access_token)
            navigate('/')
        }catch(e: any){
            setError('Your e-mail or password is invalid! Try again.')
            throw new Error(e)
        }
    };

    return (
        <div className="form">
            <h3 className="heading">Sign In</h3>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {error && <span style={{color: 'red'}}>{error}</span>}
                <br/>
                <span>If you dont have an account click
                    <NavLink
                        style={{ color: "blue" }}
                        to="/sign-up"
                    > here
                    </NavLink>
                </span>
                <div>
                    <Button
                        className="form-btn"
                        type='primary'
                        htmlType="submit">
                        Sign In
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignIn;