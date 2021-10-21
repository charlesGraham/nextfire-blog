import styles from '../styles/Home.module.css'
import { auth, GoogleAuthProvider } from '../lib/firebase'
import Image from 'next/image'
import { useCallback, useContext, useState } from 'react';
import { UserContext } from '../lib/context';
import { debounce } from 'lodash';


export default function Enter(props) {

    const { user, username } = useContext(UserContext);

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
        await auth.signInWithPopup(GoogleAuthProvider);
    };

    return (
        <div className="google-login">
            <Image src="/ae.png" alt="" width={200} height={85} />
            <button className="btn-google" onClick={signInWithGoogle}>
                <Image src="/google.png" alt="" width={50} height={50} /> Sign in with Google
            </button>
        </div>
        
    );
}

function SignOutButton() {
    return<button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onSubmit = async (e) => {
        e.preventDefault();

        //create refs for both documents
        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);

        //commit both docs together as a bath write
        const batch = firestore.batch();
        batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
        batch.set(username.Doc, { uid: user.uid });

        await batch.commit();
    };

    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        //only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);

    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log('Firestore read executed!');
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        []
    );

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="Username" value={formValue} onChange={onChange} />
                    <button type="submit" className="btn-signup" disabled={!isValid}>Submit</button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    );
}

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking ...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>
    } else {
        return <p></p>
    }
}