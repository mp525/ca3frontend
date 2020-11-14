import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    return (
      <div className="col" style={{ backgroundColor: "#F5F5DC" }} align="center">
        <h1>Welcome to CCC - Crazy Catlady Central!</h1>
        <div>
          <h3>Cat fact section:</h3>
        <p>If you click on "Cat fact" in the navbar, a random cat fact submitted by a user <br/>
        will be presented, along with that users personal information.(Fetched from external servers from backend).
        </p>
        <h3>Cat gifs section:</h3>
        <p>
          If you click on "Cat gifs", random gif of a cat will be shown.(Not fetched from external server).
        </p>
        <h3>Cat breeds section:</h3>
        <p>Clicking the "Cat breeds", you will be presented with a dropdown menu, where you can choose <br/>
        which cat breed you would like to know more about. (Content of dropdown, as well as details, is populated by a fetch call to an <br/>
        external server's api called from the backend).
        </p>
        <h3>Login menu:</h3>
        <p>
          After logging in, you can visit your "User page" to see the cats you currently own.<br/>
          You will also be able to register more.(Cat is an entity class in backend, as well as user/role)<br/>
          (Login with security, user page only visible to users, admin page only visible to admins)<br/>
          If you want to remove at cat from your list, contact an admin, and they will be able to <br/>
          remove your precious cat from their "Admin page".
        </p>
        </div>
      </div>
    );
  }

  export default Home;