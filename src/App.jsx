
import { Router, Route } from 'wouter'
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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <>
        {user ? (
          <>
            <Navbar />
              <Route path="/home" component={HomePage} />
              <Route path="/create" component={CreateIncident} />
              <Route path="/viewincidents" component={ViewIncidents} />
              {user.user_type === 'administrator' && (
                <>
                  <Route path="/completed" component={Completed} />
                  <Route path="/createuser" component={CreateUser} />
                </>
              )}
           <Route path="/" component={HomePage} />
          </>
        ) : (
          <Route path="/login" component={LoginUser} />
        )}
      </>
    </Router>
  )
}

export default App
