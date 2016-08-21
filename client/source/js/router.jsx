const React = require('react')
const page = require('page')
const Exercise = require('./views/exercise.jsx')
const ExerciseList = require('./views/exercise-list.jsx')
const Register = require('./views/register.jsx')
const SignIn = require('./views/sign-in.jsx')
const Home = require('./views/home.jsx')
const ReactGA = require('react-ga')

const UserActions = require('./actions/user-actions')

ReactGA.initialize('UA-38765332-2');

function setAndSendStat(route, statType = 'pageView') {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

module.exports = React.createClass({
    getInitialState() {
        return { component: <div /> }
    },

    render() {
        return this.state.component
    },

    componentDidMount() {
        page('/', (ctx) => {
          setAndSendStat('/')

          this.setState({
            component: <Home />
          })
        })

        page('/exercises', (ctx) => {
          setAndSendStat('/exercises')

          this.setState({
            component: <ExerciseList></ExerciseList>
          })
        })

        page('/exercises/:exercise', (ctx) => {
          setAndSendStat(`/exercises/${ctx.params.exercise}`)

          this.setState({
            component: <Exercise exercise={ctx.params.exercise} />
          })
        })

        page('/sign-in', (ctx) => {
          setAndSendStat('/sign-in')

          this.setState({
            component: <SignIn></SignIn>
          })
        })

        page('/register', (ctx) => {
          setAndSendStat('/register')

          this.setState({
            component: <Register></Register>
          })
        })

        page('/sign-out', (ctx) => {
          setAndSendStat('/sign-out')

          UserActions.signOut()
          page('/')
        })

        page('/404', (ctx) => {
          setAndSendStat('/404')

          this.setState({
            component: <div>404</div>
          })
        })

        page('*', (ctx) => {
          page('/404')
        })

        page.start()
    }
})
