const React = require('react')
const RegisterActions = require('../actions/register-actions')
const RegisterStore = require('../stores/register-store')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

module.exports = React.createClass({
    getInitialState () {
        return {
            passwordVisibile: false,
            isUsernameAvailable: true
        }
    },

    componentDidMount () {
        RegisterStore.listen(this.onChange)
    },

    componentWillUnmount () {

    },

    onChange (data) {
        this.setState(data)
    },

    handleUsernameChange (event) {
        let username = event.target.value

        if (username) {
            this.setState({username: event.target.value})
        } else {
            this.setState({
                username: event.target.value,
                isUsernameAvailable: true,
            })
        }

        RegisterActions.getUser(event.target.value)
    },

    handleEmailChange (event) {
        this.setState({email: event.target.value})
    },

    handlePasswordChange (event) {
        this.setState({password: event.target.value})
    },

    handleRegisterClick () {
        RegisterActions.register({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        })

        this.setState({
            awaitingResults: true
        })
    },

    handlePasswordClick () {
        this.setState({
            passwordVisibile: !this.state.passwordVisibile
        })
    },

    render () {
        let passwordVisibile = this.state.passwordVisibile ? 'text' : 'password'
        let passwordVisibleText = this.state.passwordVisibile ? 'HIDE' : 'SHOW'
        let userNotAvailableAlert
        let awaitingResults
        let registerButtonClass = 'register__button btn btn-block center-block'

        if (!this.state.isUsernameAvailable) {
            registerButtonClass += ' register__button--inactive'
        }

        if (this.state.awaitingResults) {
            awaitingResults =
                    <div className="button--sent">
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </div>
        }

        if (!this.state.isUsernameAvailable) {
            userNotAvailableAlert = <div className="register__input--alert">Username is already taken.</div>
        } else userNotAvailableAlert = null

        return (
            <div className="col-sm-12 register">
                <div className="center-block register__inner">
                    <h2 className="text-center register__title">Enter Your Details</h2>

                    <div className="register__inputs center-block">
                        <input type="text"
                               value={this.state.value}
                               onChange={this.handleUsernameChange}
                               className="register__input register__input--username center-block"
                               placeholder="username">
                        </input>

                        {userNotAvailableAlert}

                        <div className="register__password-wrapper center-block">
                            <input type={passwordVisibile}
                                   onChange={this.handlePasswordChange}
                                   className="register__input register__input--password"
                                   placeholder="password">
                            </input>
                            <div onClick={this.handlePasswordClick}
                                 className="register__password-visibility">{passwordVisibleText}</div>
                        </div>

                        <input type="text"
                               onChange={this.handleEmailChange}
                               className="register__input register__input--email center-block"
                               placeholder="email (optional)">
                        </input>
                    </div>

                    <div style={{position: "relative"}}>
                        <button className={registerButtonClass}
                                onClick={this.handleRegisterClick}
                                disabled={!this.state.isUsernameAvailable}>
                            Register
                        </button>

                        <ReactCSSTransitionGroup
                            transitionName="button-transition"
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                        >
                            {awaitingResults}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        )
    }
})
