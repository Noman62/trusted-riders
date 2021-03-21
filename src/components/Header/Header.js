import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div >
            <nav class="navbar navbar-light bg-info">
                <div class="container-fluid">
                    <a class="navbar-brand">Trusted Riders</a>
                    <div class="d-flex">
                        <nav class="nav">
                          
                            <Link class="nav-link text-dark" aria-current="page" to="/home">Home</Link>
                            <Link class="nav-link text-dark" aria-current="page" to="/book">Destination</Link>
                            <Link class="nav-link text-dark" aria-current="page" to="/home">Blog</Link>
                            <Link class="nav-link text-dark" aria-current="page" to="/home">Contact</Link>
                            <button type="button" class="btn btn-warning">
                            <Link class="nav-link text-dark" aria-current="page" to="/create">Login</Link></button>
                            
                        
                        </nav>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;