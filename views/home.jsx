// var React = require('react');

// function App(props){
//     const foundContainers=props.foundContainers;
//     const foundUser=props.foundUser;
//     const foundTodos=props.foundTodos;
//     let containers=[];
//     foundContainers.forEach(foundContainer=>{
//         var singleconatiner={
//             containerName: "",
//             containerid: "",
//             Todos: [],
//             Todosid: []
//         }
//         singleconatiner.containerName=foundContainer.containerName;
//         singleconatiner.containerid=foundContainer._id;
//         foundTodos.forEach(foundTodo=>{
//             if((foundTodo.containerRelated).toString() === (foundContainer._id).toString()){
//                 singleconatiner.Todos.push(foundTodo.todoTask);
//                 singleconatiner.Todosid.push(foundTodo._id);
//             }
//         })
//         containers.push(singleconatiner);
//         // singleconatiner.containerName="",
//         // singleconatiner.containerid="",
//         // singleconatiner.Todos=[],
//         // singleconatiner.Todosid=[]
//     })
//     const navbar=[];
//     const display = [];
//     let displayTodo=[];
//     let displayTodoIds=[];
//     const displayTodoAll=[];
//     const displayhrefdeletecontainer=[];
//     let href;
//     navbar.push(
//     <div>
//         <a className="nav-item nav-link active" href="/home">Home</a>
//         {/* <a className="nav-item nav-link" href="/Profile">Profile</a> */}
//         {/* <a className="nav-item nav-link" href="/Settings">Settings</a> */}
//         {/* <a className="nav-item nav-link" href="/signup">SignUp</a> */}
//         {/* <a className="nav-item nav-link" href="/login">Login</a> */}
//         <a className="nav-item nav-link" href="/logout">LogOut</a>
//     </div>
//     );

//     containers.forEach(container=>{
//         displayTodo=[];
//         container.Todosid.forEach(singleTodoId=>{
//             href="/home/"+singleTodoId+"/deletetodo?_method=DELETE";
//             displayTodoIds.push(
//                 <div>
//                     <form action={href} method="POST">
//                         <button>Delete</button>
//                     </form>
//                 </div>
//             )
//         })
//         let i=0;
//         container.Todos.forEach(singleTodo=>{
//             displayTodo.push(
//             <div>
//                 <p>{singleTodo}</p>
//                 {displayTodoIds[i++]}
//             </div>
//                             );
//         })
//         displayTodoIds=[];
//         href="/home/container/"+container.containerid+"?_method=DELETE";
//         displayhrefdeletecontainer.push(href)
//         href="/home/"+container.containerid+"/newtodo";
//         displayTodoAll.push(<div>
//             <div>
//                 {displayTodo}
//             </div>
//             <div><button><a href={href}>ADD new Todo</a></button></div>
//             </div>);
//     });
//     let i=0;
//     for(var container of containers){
//         display.push(<div>
//             <div>
//                 <h1>{container.containerName}</h1>
//                 <form action={displayhrefdeletecontainer[i]} method="POST">
//                     <button>Delete</button>
//                 </form>
//             </div>
//             <div>
//                 {displayTodoAll[i]}
//             </div>
//         </div>)
//         i=i+1;
//     }  
//     href="/home/container/new"; 
//     return(
//         <div>
//             <div>
//                 {navbar}
//             </div>
//             <div>
//                 {display}
//             </div>
//             <a href={href}>Add new Container</a>
//         </div>
//     )
// }

// export default App

var React = require('react');

function App(props) {
    const foundContainers=props.foundContainers;
    const foundUser=props.foundUser;
    const foundTodos=props.foundTodos;
    let containers=[];
    foundContainers.forEach(foundContainer=>{
        var singleconatiner={
            containerName: "",
            containerid: "",
            Todos: [],
            Todosid: []
        }
        singleconatiner.containerName=foundContainer.containerName;
        singleconatiner.containerid=foundContainer._id;
        foundTodos.forEach(foundTodo=>{
            if((foundTodo.containerRelated).toString() === (foundContainer._id).toString()){
                singleconatiner.Todos.push(foundTodo.todoTask);
                singleconatiner.Todosid.push(foundTodo._id);
            }
        })
        containers.push(singleconatiner);
    })
    const styleBody = {

        fontFamily: 'Arial',
        width: 100 + '%',
        backgroundColor: 'black',
        overflow: 'auto',
        marginBottom: 10+"px",
        marginTop:0+"px"
    }
    const stylea = {
        float: 'left',
        padding: 12 + 'px',
        color: 'white',
        textDecoration: 'none',
        fontSize: 17 + 'px',
    }
    const stylear = {
        float: 'right',
        padding: 12 + 'px',
        color: 'white',
        textDecoration: 'none',
        fontSize: 17 + 'px',
    }
    const headstyle = {
        /* marginLeft: 500 + "px",
        backgroundColor: 'black', color: 'white', width: 400 + "px", marginTop: 50+"px",
        display: 'block',fontFamily: 'Franklin Gothic', fontWeight: 'Bold', fontStyle: 'italic',
        fontSize: 30 + "px", textAlign: 'center', paddingTop: 5 + "px", paddingBottom: 5 + "px",
        textTransform: 'uppercase', opacity: 80 + "%" */
        fontFamily: 'Franklin Gothic', textAlign: 'center', fontWeight: 'normal',
        fontSize: 18 + "px", paddingTop: 3 + "px", marginTop:50+"px",
        paddingBottom: 3 + "px", backgroundColor: 'silver',
        display: 'block', color: "black", width:400+"px", marginLeft:500+"px",
    }

    const itemsstyle = {
        marginLeft: 500 + "px", backgroundColor: 'silver', width: 400 + "px",
        fontFamily: 'sans-serif', fontWeight: 'normal',
        fontSize: 20 + "px", textAlign: 'center',
        paddingTop: 3 + "px", paddingBottom: 3 + "px",
        display: 'block', opacity: 80 + "%", position: 'relative',
    }

    const buttonstyle = {
        fontWeight: 'normal', fontSize: 20 + "px",
        textAlign: 'center', paddingTop: 3 + "px",
        paddingBottom: 3 + "px", marginLeft: 500 + "px",
        width: 400 + "px", fontFamily: 'Verdana', backgroundColor: 'alto', display: 'block'
    }

    const deletestyle = {
        fontFamily: 'Arial', fontWeight: 'normal', fontSize: 13 + "px",
        textAlign: 'center', paddingTop: 3 + "px",
        paddingBottom: 3 + "px", marginLeft: 900 + "px",
        backgroundColor: 'alto', display: 'block', position: 'relative',
    }

    const newcontainer = {
        fontFamily: 'Franklin Gothic', textAlign: 'center', fontWeight: 'normal',
        fontSize: 18 + "px", paddingTop: 3 + "px",
        paddingBottom: 3 + "px", backgroundColor: 'silver',
        display: 'block', color: "black",
    }
    const sidebaralltodo = {
        fontFamily: 'Franklin Gothic', float: 'left',
        width: 20 + "%", textAlign: 'center', marginTop: 20 + "px"
    }
    const sidetododesign = {
        fontWeight: 'normal', fontSize: 18 + "px",
        paddingTop: 3 + "px", paddingBottom: 3 + "px",
        backgroundColor: 'silver', opacity: 70 + "%",
        display: 'block'
    }

    const headtodo = {
        fontWeight: 'Bold', fontSize: 25 + "px",
        paddingTop: 5 + "px", paddingBottom: 5 + "px",
        textTransform: 'uppercase', backgroundColor: 'whitesmoke',
        display: 'block'
    }
    const footer = {
        backgroundColor: 'gray',
        marginTop: 15 + "px",
        fontSize: 18 + "px", fontFamily: 'sans-serif',
        width: 100 + "%", height: 100 + "%"
    }

    const help = {
        fontSize: 18 + "px", paddingTop: 5 + "px",
        paddingBottom: 3 + "px", float: 'left',
        marginLeft: 10 + "px", fontWeight: 'bold',
    }

    const follow = {
        fontSize: 18 + "px", paddingTop: 5 + "px",
        paddingBottom: 5 + "px",
        marginLeft: 950 + "px",
    }

    const terms = {
        fontSize: 18 + "px", paddingTop: 5 + "px",
        marginLeft: 500 + "px", paddingBottom: 5 + "px",
        position: 'absolute', float: 'right'
    }
    // const containers = props.containers;
    const navbar = [];
    const display = [];
    let displayTodo = [];
    let displayTodoIds = [];
    const displayTodoAll = [];
    const sidetodos = [];
    const displayhrefdeletecontainer = [];
    let href;
    navbar.push(
        <div id='navbar' style={Object.assign({}, styleBody, stylea)}>
            <a className="active" style={Object.assign({}, stylea)} href="#">FREE SPACE</a>
            <a className="nav-item nav-link active" style={Object.assign({}, stylea)} href="/home">Home</a>
            <a className="nav-item nav-link" style={Object.assign({}, stylear)} href="/logout">LogOut</a>
        </div>);

    containers.forEach(container => {
        displayTodo = [];
        container.Todosid.forEach(singleTodoId => {
            href = "/home/" + singleTodoId + "/deletetodo?_method=DELETE";
            displayTodoIds.push(
                <div>
                    <form action={href} method="POST">
                        <button style={deletestyle}><span>Delete</span></button>
                    </form>
                </div>
            )
        })
        let i = 0;
        container.Todos.forEach(singleTodo => {
            displayTodo.push(
                <div>
                    <x style={itemsstyle}>{singleTodo}</x>
                    {displayTodoIds[i++]}
                </div>
            );
        })
        displayTodoIds = [];
        href = "/home/container/" + container.containerid + "?_method=DELETE";
        displayhrefdeletecontainer.push(href)
        href = "/home/" + container.containerid + "/newtodo";
        displayTodoAll.push(<div>
            <div>
                {displayTodo}
            </div>
            <div><button style={buttonstyle}><a href={href}>Add New Todo</a></button></div>
        </div>);
    });

    containers.forEach(container => {
        sidetodos.push(<side style={sidetododesign} >{container.containerName}</side>);
    });

    let i = 0;
    for (var container of containers) {
        display.push(<div>
            <l1 style={headstyle}>{container.containerName}</l1>
            <div>
                {displayTodoAll[i]}
            </div>
            <div>
                <form action={displayhrefdeletecontainer[i]} method="POST">
                    <button style={buttonstyle}>Delete</button>
                </form>
            </div>
        </div>)
        i = i + 1;
    }
    href = "/home/container/new";
    return (
        <div>
            <div>
                {navbar}
            </div>
            <div className='containertodo' style={sidebaralltodo}>
                <heading style={headtodo}>Your Container</heading>
                {sidetodos}
                <adding style={newcontainer}><a href={href}>Add New Container</a></adding>
            </div>
            <div>
                {display}
            </div>
            <div className="footer" style={footer}>
                {/* <div className="logo_container_footer">
                    <img src="./logo_illume1.png" alt="logo"></img>
                </div> */}
                <div className="footer_third">
                    <x1 style={help}>Need help?</x1>
                    <a href="#" style={terms}>Terms and Conditions </a>
                </div>
                <div className="footer_third">
                    <y1 style={follow}>More</y1>
                </div>
                <div className="footer_third">
                    <l1 style={follow}>Follow Us</l1>
                    <span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default App