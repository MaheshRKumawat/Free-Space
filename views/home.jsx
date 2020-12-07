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
        fontSize: 24 + "px", paddingTop: 3 + "px", marginTop:50+"px",
        paddingBottom: 3 + "px", 
        display: 'block', width:405+"px", marginLeft:500+"px",
        backgroundColor: '#343a40',  color: 'white',
        marginBottom:'25px'
    }

    const itemsstyle = {
        marginLeft: 500 + "px", width: 400 + "px",
        fontFamily: 'sans-serif', fontWeight: 'normal',
        fontSize: 20 + "px", textAlign: 'center',
        paddingTop: 3 + "px", paddingBottom: 3 + "px",
        display: 'block', opacity: 80 + "%", position: 'relative',
        
  color: 'black',
  border:'2px solid #e7e7e7',
  marginTop:'24px'

    }

    const buttonstyle = {
        fontWeight: 'normal', fontSize: 13 + "px",
        textAlign: 'center', paddingTop: 3 + "px",
        paddingBottom: 3 + "px", marginLeft: 500 + "px",
        width: 400 + "px", fontFamily: 'Verdana', backgroundColor: '#9af7c3', display: 'block'
    }

    const newtodobuttonstyle = {
      fontWeight: 'normal', fontSize: 13 + "px",
      textAlign: 'center', paddingTop: 3 + "px",
      paddingBottom: 3 + "px", marginLeft: 500 + "px",marginTop:'24px',
      width: 400 + "px", fontFamily: 'Verdana', backgroundColor: '#9af7c3', display: 'block',border: '2px solid #e7e7e7', borderRadius:'100px',
  }

    const deletebuttonstyle = {
      fontWeight: 'normal', fontSize: 13 + "px",
      textAlign: 'center', paddingTop: 3 + "px",
      paddingBottom: 3 + "px", marginLeft: 500 + "px",
      width: 400 + "px", fontFamily: 'Verdana', backgroundColor: 'white', display: 'block',
      borderRadius:'100px',border: '2px solid #ffadad',
  }

    const deletestyle = {
        fontFamily: 'Verdana', fontWeight: 'normal', fontSize: 13 + "px",
        textAlign: 'center', paddingTop: 3 + "px",
        paddingBottom: 3 + "px", marginLeft: 910 + "px",
        backgroundColor: '#f85151', display: 'block', position: 'relative',
        borderRadius:'100px',marginTop:'-30px'
    }

    const newcontainer = {
        fontFamily: 'Franklin Gothic', textAlign: 'center', fontWeight: 'normal',
        fontSize: 18 + "px", paddingTop: 3 + "px",
        paddingBottom: 3 + "px", backgroundColor: '#9af7c3',
        display: 'block', color: "black",
    }
    const sidebaralltodo = {
        fontFamily: 'Franklin Gothic', float: 'left',
        width: 20 + "%", textAlign: 'center', marginTop: 20 + "px"
    }
    const sidetododesign = {
        fontWeight: 'normal', fontSize: 18 + "px",
        paddingTop: 3 + "px", paddingBottom: 3 + "px",
       opacity: 70 + "%",
        display: 'block',
        backgroundColor: 'white',
  color: 'black',
  border: '2px solid #e7e7e7',
    }

    const headtodo = {
       fontSize: 25 + "px",
        paddingTop: 5 + "px", paddingBottom: 5 + "px",
        textTransform: 'uppercase',
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
            <div style={{width:'100%'}}>
              <ul style={{listStyleType: 'none',margin: '-9px',padding: '0',overflow: 'hidden',border: '1px solid #e7e7e7',backgroundColor: '#343a40'}}>
                <li style={{float:'left'}}><a style={{fontFamily: 'Verdana',width:'100%',overflow: 'auto',display: 'block',color: 'white',textAlign: 'center',padding: '14px 16px',textDecoration: 'none',}} class="active" href="/">FreeSpace</a></li>
                <li style={{float:'left'}}><a style={{fontFamily: 'Verdana',width:'100%',overflow: 'auto',display: 'block',color: 'white',textAlign: 'center',padding: '14px 16px',textDecoration: 'none',}} href="/home">Home</a></li>
                <li style={{float:'right'}}><a style={{fontFamily: 'Verdana',width:'90%',overflow: 'auto',display: 'block',color: 'white',textAlign: 'center',padding: '14px 16px',textDecoration: 'none',}} href="/logout">Logout</a></li>
                <li style={{float:'right'}}><a style={{fontFamily: 'Verdana',width:'100%',overflow: 'auto',display: 'block',color: 'white',textAlign: 'center',padding: '14px 16px',paddingRight: '10px',textDecoration: 'none',}} href="#">Signed in as {foundUser.username}</a></li>
              </ul>
            </div>
          );

    containers.forEach(container => {
        displayTodo = [];
        container.Todosid.forEach(singleTodoId => {
            href = "/home/" + singleTodoId + "/deletetodo?_method=DELETE";
            displayTodoIds.push(
                <div>
                    <form action={href} method="POST">
                        <button style={deletestyle}>X</button>
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
            <div><button style={newtodobuttonstyle}><a style={{ color: 'black',textDecoration:'none'}}href={href}>New Todo</a></button></div>
        </div>);
    });

    containers.forEach(container => {
        sidetodos.push(<side style={sidetododesign} >{container.containerName}</side>);
    });

    let i = 0;
    for (var container of containers) {
        display.push(<div>
          <div>
            <div style={headstyle}>{container.containerName}
            </div>
            
          </div>
            <div>
                {displayTodoAll[i]}
                <form action={displayhrefdeletecontainer[i]} method="POST">
                  <button style={deletebuttonstyle}>Delete Container</button>
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
                <heading style={headtodo}>Your Containers</heading>
                {sidetodos}
                <adding style={newcontainer}><a style={{textDecoration:'none'}} href={href}>Add New Container</a></adding>
            </div>
            <div>
                {display}
            </div>
        </div>
    )
}

export default App