import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../component-stylesheets/Navbar.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  
  )
}

export default MyApp
