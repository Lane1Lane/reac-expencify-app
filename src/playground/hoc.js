import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// const withAdminWarning = (WrappedComponent) => {
//     return (props) => (
//         <div>
//             <p>This is private info</p>
//             <WrappedComponent {...props}/>
//         </div>  
//     );
// };

// const AdminInfo = withAdminWarning(Info);

// const AdminInfo = (props) => (
//     <div>
//         <p>This is private info</p>
//         <Info {...props}/>
//     </div>      
// )

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {!props.isAuthenticated ? <p>Please log in</p> : <WrappedComponent {...props}/>}
        </div>
    )
}

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are the details"/>,document.getElementById('app'));