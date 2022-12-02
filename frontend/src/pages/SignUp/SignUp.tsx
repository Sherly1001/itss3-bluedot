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

interface SignUpInfo{
    name: string;
    email: string;
    password: string;
    comfirm: string;
}

function SignUp() {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const onFinish = async (values: SignUpInfo) => {
        console.log(values);
        try{
            const body = {
                name: values.name,
                email: values.email,
                password: values.password
            }
            await axios.post('http://localhost:3000/user', body)
            navigate('/sign-in')
        }catch(e: any){
            console.log(e.response.status)
            setError('このメールはすでに存在しています。')
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
                    name="name"
                    label="名前"
                    rules={[
                        {
                            required: true,
                            message: '名前を入力してください。',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="メールアドレス"
                    rules={[
                        {
                            type: 'email',
                            message: '入力は有効な電子メールではありません。',
                        },
                        {
                            required: true,
                            message: 'メールアドレスを入力してください。',
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
                            message: 'パスワードを入力してください。',
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
                            message: 'パスワードを確認してください。',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('入力した 2 つのパスワードが一致しません。'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {error && <span style={{color: 'red'}}>{error}</span>}
                <br />
                <span>アカウントをお持ちはこちら
                    <NavLink
                        style={{ color: "blue" }}
                        to="/sign-in"
                    >こちら
                    </NavLink>
                    。
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