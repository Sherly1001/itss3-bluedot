import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';

function SignIn() {

    const onFinish = (values: any) => {
        console.log(values);
    }

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
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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