
import { Router, Route, Switch, Redirect } from 'wouter'
import { useLogin } from './context/AuthContext'
import { LoginUser } from './components/LoginUser'
import { Navbar } from './components/Navbar'
import HomePage from './components/HomePage'
import { CreateIncident } from './components/CreateIncident'
import { ViewIncidents } from './components/ViewIncidents'
import Completed from './components/Completed'
import CreateUser from './components/CreateUser'

function App() {
  const { user, loading } = useLogin()
  console.log("User:", user, "Loading:", loading)

  if (loading) {
    console.log("Rendering loading state")
    return <div>Loading...</div>
  }
  
  console.log("Rendering main content")
  console.log("Current path:", window.location.pathname)

  return (
    <Router>
      <>
        {user ? (
          <>
            <Navbar />
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/create" component={CreateIncident} />
              <Route path="/viewincidents" component={ViewIncidents} />
              {user.user_type === 'administrator' && (
                <>
                  <Route path="/completed" component={Completed} />
                  <Route path="/createuser" component={CreateUser} />
                </>
              )}
              <Route>
                {console.log("Redirecting to home")}
                <Redirect to="/home" />
              </Route>
            </Switch>
          </>
        ) : (
          <Switch>
            <Route path="/login" component={LoginUser} />
            <Route>
              {console.log("Redirecting to login")}
              <Redirect to="/login" />
            </Route>
          </Switch>
        )}
      </>
    </Router>
  )
}

export default App