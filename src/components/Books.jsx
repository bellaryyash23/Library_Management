import React, {useState, useEffect} from "react";
import axios from "axios";

function Books(){

    const [books, setBooks] = useState([]);
    // const [userIn, setUserIn] = useState(false);
    // const [admin, setAdmin] = useState(false);
    // const [user, setUser] = useState();

    const fetchBooks = async () => {
        const data = await axios.get('http://localhost:5000/books')
        const { books } = data.data
        setBooks(books);
        console.log(books);
      }

    
    // const logoutUser = async () => {
    //     await axios.post("http://localhost:5000/logout");
    //     setUserIn(false);
    //     window.location.href = "/";
    // }

  
    useEffect(() => {
        fetchBooks();
    }, [])

    // useEffect(() => {
    //     (async () => {
    //       try {
    //         const resp = await axios.get("//localhost:5000/info");
    //         setUser(resp.data);
    //         setUserIn(true);
    //         if (resp.data.id === 1){
    //             setAdmin(true);
    //         }
    //         console.log(user);
    //       } catch (error) {
    //         console.log("Not authenticated");
    //       }
    //     })();
    //   }, [user]);

    return (

        <div className="row">
        <div className="col-sm-12">
    
        <h1 className="display-3 text-danger font-weight-bold">Books Catalogue</h1>

        <a className="btn btn-warning btn-lg left-align font-weight-bold" href="/search" role="button">Search Book</a><span> </span>
        <a className="btn btn-warning btn-lg font-weight-bold" href="/issue" role="button">Issue Book</a>

    {/* {userIn ? <div><p></p><a className="btn btn-warning btn-lg font-weight-bold" href={logoutUser} role="button">Logout</a></div> */}
      {/* : null */}

        <p></p>
    <table className="table">
    <tbody>
    <tr className="font-weight-bold">
        <td>Book Title</td>
        <td>Author</td>
        <td>Genre</td>
        <td>Rating</td>
        <td>Copies Available</td>
    </tr>
    {books.map(book => {
        return (<tr><td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.rating}/5</td>
        <td>{book.copies}</td></tr>)
    })}
    </tbody>
  	</table> 
    
      </div>
    {/* {admin ?  */}
    <div>
      <a className="btn btn-warning btn-lg left-align font-weight-bold" href="/add" role="button">Add Book</a>
      <p className="col-sm"></p>
      <a className="btn btn-warning btn-lg font-weight-bold" href="/delete" role="button">Delete Book</a>
      <p className="col-sm"></p>
      <a className="btn btn-warning btn-lg font-weight-bold" href="/edit" role="button">Edit Copies Available</a>
      </div>
      {/* : null */}
      

    </div> )
}


export default Books;