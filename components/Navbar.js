import React from 'react';
import Link from 'next/link';

function Navbar() {
    const { user, username } = { };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button>FEED</button>
                    </Link>
                </li>

                {/* user is signed in AND has a username */}
                {username && (
                    <>
                        <li className="push-left">
                            <Link href="/admin">
                                <button className="btn-blue">Write Posts</button>
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
                {username && (
                    <>
                    <li>
                        <Link href="/enter">
                            <button className="btn-blue">Log In</button>
                        </Link>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
