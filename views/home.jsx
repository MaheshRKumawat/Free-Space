var React = require('react');

function App(props){
    const containers=props.containers;
    const navbar=[];
    const display = [];
    navbar.push(
    <div>
        <a class="nav-item nav-link active" href="/home">Home</a>
        <a class="nav-item nav-link" href="/Profile">Profile</a>
        <a class="nav-item nav-link" href="/Settings">Settings</a>
        <a class="nav-item nav-link" href="/login">Login</a>
        <a class="nav-item nav-link" href="/signup">SignUp</a>
        <a class="nav-item nav-link" href="/logout">LogOut</a>
    </div>);
    containers.forEach((container)=>{
        display.push(<div><div>{container.containerName}</div><div>{container.Todos}</div></div>)
    })
    return(
        <div>
            <div>
                {navbar}
            </div>
            <div>
                {display}
            </div>
        </div>
    )
}

export default App