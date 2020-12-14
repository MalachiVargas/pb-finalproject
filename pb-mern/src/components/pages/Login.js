import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        email: '',
        password: '',
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        // reset errors

        const emailError = document.querySelector('.helper-text.email');
        const passwordError = document.querySelector('.helper-text.password');
        emailError.textContent = '';
        passwordError.textContent = '';

        await axios
            .post('http://localhost:3000/login', JSON.stringify(this.state), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.user) {
                    const { setAuth } = this.props;
                    setAuth(res.data);
                }
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    emailError.textContent = error.response.data.errors.email;
                    passwordError.textContent =
                        error.response.data.errors.password;
                }
            });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    render() {
        const { isAuth } = this.props;

        if (isAuth) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <main className="body center">
                <section
                    className="section container z-depth-3"
                    id="signup-form"
                >
                    <h1 className="center-align">Login</h1>
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="col s6"
                                    onChange={this.handleChange}
                                    required
                                />
                                <span
                                    className="helper-text email"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>

                            <div className="input-field">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="col s6"
                                    onChange={this.handleChange}
                                    required
                                />
                                <span
                                    className="helper-text password"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>

                            <button
                                className="waves-effect waves-light indigo lighten-1 btn"
                                id="signup-button"
                                type="submit"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        );
    }
}

export default Login;
