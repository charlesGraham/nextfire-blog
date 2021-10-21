import styles from '../styles/Home.module.css'
import { auth, GoogleAuthProvider } from '../lib/firebase'
import Image from 'next/image'

export default function Enter(props) {

    const user = null;
    const username = null;

    return(
        <main>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}

// sign in with Google
function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <Image src="/google.png" alt="" width={50} height={50} /> Sign in with Google
        </button>
    );
}

function SignOutButton() {
    return<button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {

}