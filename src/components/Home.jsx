import React from "react";
// import axios from "axios";


function Home(){

    // const [userIn, setUserIn] = useState(false);
    // const [user, setUser] = useState();

    // const logoutUser = async () => {
    //     await axios.post("http://localhost:5000/logout");
    //     setUserIn(false);
    // }

    // useEffect(() => {
    //     (async () => {
    //       try {
    //         const resp = await axios.get("//localhost:5000/info");
    //         setUser(resp.data);
    //         setUserIn(true);
    //         console.log(user);
    //       } catch (error) {
    //         console.log("Not authenticated");
    //       }
    //     })();
    //   }, [user]);


    return <div className="jumbotron text-center">
            <div className="container">
                <h1 className="display-4 font-weight-bold text-warning">📚 Yash's Library 📕</h1>
                <p className="lead">Looking for some interesting books to read?</p>
                <hr className="my-4" />
                <p className="lead">You've found the right place! 
                Checkout my collection of books from various genres.</p>
                <p className="lead">View and issue your copy now!</p>
            {/* userIn ?  */}
            <div><a className="btn btn-warning btn-lg left-align font-weight-bold" href="/books" role="button">VIEW</a><span> </span>
                {/* <a className="btn btn-warning btn-lg font-weight-bold" href={logoutUser} role="button">LOGOUT</a></div>
                :
                <div>
                <a className="btn btn-warning btn-lg left-align font-weight-bold" href="/login" role="button">LOGIN</a><span> </span>
                <a className="btn btn-warning btn-lg font-weight-bold" href="/register" role="button">REGISTER</a> */}
                </div>
            
                
            </div>
         </div>
}

export default Home;