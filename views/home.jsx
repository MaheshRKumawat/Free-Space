var React = require('react');

function App(props){
    const containers=props.containers;
    const navbar=[];
    const display = [];
    let displayTodo=[];
    let displayTodoIds=[];
    const displayTodoAll=[];
    const displayhrefdeletecontainer=[];
    let href;
    navbar.push(
    <div>
        <a className="nav-item nav-link active" href="/home">Home</a>
        <a className="nav-item nav-link" href="/Profile">Profile</a>
        <a className="nav-item nav-link" href="/Settings">Settings</a>
        <a className="nav-item nav-link" href="/signup">SignUp</a>
        <a className="nav-item nav-link" href="/login">Login</a>
        <a className="nav-item nav-link" href="/logout">LogOut</a>
    </div>);

    containers.forEach(container=>{
        displayTodo=[];
        container.Todosid.forEach(singleTodoId=>{
            href="/home/"+singleTodoId+"/deletetodo?_method=DELETE";
            displayTodoIds.push(
                <div>
                    <form action={href} method="POST">
                        <button>Delete</button>
                    </form>
                </div>
            )
        })
        let i=0;
        container.Todos.forEach(singleTodo=>{
            displayTodo.push(
            <div>
                <p>{singleTodo}</p>
                {displayTodoIds[i++]}
            </div>
                            );
        })
        displayTodoIds=[];
        href="/home/container/"+container.containerid+"?_method=DELETE";
        displayhrefdeletecontainer.push(href)
        href="/home/"+container.containerid+"/newtodo";
        displayTodoAll.push(<div>
            <div>
                {displayTodo}
            </div>
            <div><button><a href={href}>ADD new Todo</a></button></div>
            </div>);
    });
    let i=0;
    for(var container of containers){
        display.push(<div>
            <div>
                <h1>{container.containerName}</h1>
                <form action={displayhrefdeletecontainer[i]} method="POST">
                    <button>Delete</button>
                </form>
            </div>
            <div>
                {displayTodoAll[i]}
            </div>
        </div>)
        i=i+1;
    }  
    href="/home/container/new"; 
    return(
        <div>
            <div>
                {navbar}
            </div>
            <div>
                {display}
            </div>
            <a href={href}>Add new Container</a>
        </div>
    )
}

export default App