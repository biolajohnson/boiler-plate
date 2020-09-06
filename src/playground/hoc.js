import React from 'react'
import ReactDOM from 'react-dom'


const Info = (props) => (
    <div>
      <h1>Info</h1>
      <p>The info: {props.message}</p>
    </div>
)

//HOC (Higher Order Component)

const withAdminWarning = (WrappedComponent) => {

    return (props) => (
        <div>
        {props.isAdmin &&<p>This is priviledged infomation.</p>}
        <WrappedComponent {...props}/>
        </div>
    ) 
} 
const AdminInfo = withAdminWarning(Info)


const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
        {props.isAuth && <p>Thanks for authenticating!</p>}
        <WrappedComponent {...props} />
        </div>
    )
}

const AuthInfo = requireAuthentication(Info)

ReactDOM.render(<AuthInfo isAuth={true} message="These are the details!"/>, document.getElementById('app'))