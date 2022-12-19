import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ConstanthPathEnum } from '../../constanth/constanth.path';
import axiosInstance from '../../requests/axiosInstance';

interface SignInInfo{
    email: string;
    password: string;
}

function SignIn() {
    const navigate = useNavigate()
    const [error, setError] = useState<string>('');
    const onFinish = async (values: SignInInfo) => {
        console.log('Received values of form: ', values)
        try {
            const body = {
                email: values.email,
                password: values.password
            }
            const res = await axiosInstance.post('user/login', body)
            localStorage.setItem('token', res.data.data.access_token)
            const res1 = await axiosInstance.get('user')
            localStorage.setItem('username', res1.data.data.name)
            localStorage.setItem('useremail', res1.data.data.email)
            if(res1.data.data.isAdmin === true) localStorage.setItem('isAdmin', 'admin')
            navigate('/')
        } catch (e: any) {
            setError('メールアドレスまたはパスワードが無効です!再試行。')
            throw new Error(e)
        }
    };

    return (
        <div className="form">
            <h3 className="heading">サインイン</h3>
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
                            message: 'メールアドレスを入力してください!',
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        type="email"
                        placeholder="メールアドレス"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'パスワードを入力してください!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="パスワード"
                    />
                </Form.Item>
                {error && <span style={{ color: 'red' }}>{error}</span>}
                <br />
                <span>
                    アカウントをお持ちでない方はこちら
                    <NavLink
                        style={{ color: "blue" }}
                        to={ConstanthPathEnum.SIGN_UP}
                    >こちら
                    </NavLink>
                    。
                </span>
                <div>
                    <Button
                        className="form-btn"
                        type='primary'
                        htmlType="submit">
                        サインイン
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignIn;
