import React from 'react';
import Link from 'next/link';


function Navbar() {
    const user = null;
    const username = null;

    return (
        <nav className="navbar">
            <h1>AgentElite</h1>
            <ul>
                <li>
                    <Link href="/">
                        <button>ARTICLE FEED</button>
                    </Link>
                </li>

                {/* user is signed in AND has a username */}
                {username && (
                    <>
                        <li className="">
                            <Link href="/admin">
                                <button id="write-btn">Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} alt="" />
                            </Link>
                        </li>
                    </>
                )}

                {/* user is not signed in OR has not created a username */}
                {!username && (
                    <>
                    <li>
                        <Link href="/enter">
                            <button id="login-btn">Log In</button>
                        </Link>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
