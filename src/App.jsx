import { Router, Route, Switch } from 'wouter'
import { useLogin } from './context/LoginContext'
import { Login } from './components/Login'
import { Nav } from './components/Nav'
import Home from './components/Home'
import { Create } from './components/Create'
import { ViewIncidents } from './components/ViewIncidents'
import Completed from './components/Completed'
import CreateUser from './components/CreateUser'

function App() {
  const { user, loading } = useLogin()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <>
        {user ? (
          <>
            <Nav />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/viewincidents" component={ViewIncidents} />
              {user.user_type === 'administrator' && (
                <>
                  <Route path="/completed" component={Completed} />
                  <Route path="/createuser" component={CreateUser} />
                </>
              )}
              <Route path="/" component={Home} />
            </Switch>
          </>
        ) : (
          <Route path="/login" component={Login} />
        )}
      </>
    </Router>
  )
}

export default App
