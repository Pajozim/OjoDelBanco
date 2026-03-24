import './App.css';
import Camera from './api/camera/reader.tsx';

function App() {

  return (
    <>
      <section id="center">
        <div id="payment">
          <h1>Payment</h1>
          <Camera />
          <form>       
            <input type="text" id="fullName" name="fullName" placeholder="name of recipient" />
            <br></br>
            <input type="text" id="Alias" name="Alias" placeholder="alias" />
            <br></br>
            <input type="text" id="AccNum" name="AccNum" placeholder="account number" />
            <br></br>
            <input type="text" id="BankInst" name="BankInst" placeholder="Banking institution" />
            <br></br>
            <input type="submit" id="submit" value="Pay" />
          </form>
        </div>
      </section>
    </>
  )
}

export default App

/*

<button
            className="camera"
            onClick={() => Camera()}
          >
            Camera / Reader
          </button>

*/