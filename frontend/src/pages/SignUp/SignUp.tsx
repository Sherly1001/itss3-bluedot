import {
    Button,
    Form,
    Input
} from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

function SignUp() {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const onFinish = async (values: any) => {
        console.log(values);
        try{
            const body = {
                name: values.username,
                email: values.email,
                password: values.password
            }
            await axios.post('http://localhost:3000/user', body)
            navigate('/sign-in')
        }catch(e: any){
            setError('新しいアカウントを作成できません!再試行。')
            throw new Error(e)
        }
    }

    return (
        <div className='form'>
            <h3 className='heading'>サインアップ</h3>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="名前"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="メール"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="パスワード"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="確認パスワード"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {error && <span style={{color: 'red'}}>{error}</span>}
                <br />
                <span>アカウントをお持ち場合は、
                    <NavLink
                        style={{ color: "blue" }}
                        to="/sign-in"
                    >ここ
                    </NavLink>
                    をクリックしてください。
                </span>
                <div>
                    <Button
                        className="form-btn"
                        type='primary'
                        htmlType="submit">
                        サインアップ
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignUp;