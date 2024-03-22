import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PiHamburgerBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";



const Navbar = () => {
    const token = localStorage.getItem("jwtToken");
    const [showNavbar, setShowNavbar] = React.useState(false);
    const [response, setResponse] = useState("");

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handleLiClick = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleLogout = async () => {
        try {
            const res = await axios.get("http://recipe-eight-theta.vercel.app/api/logout", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                localStorage.removeItem("jwtToken");
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getMe = async () => {
        try {
            const res = await axios.get("http://recipe-eight-theta.vercel.app/api/me", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res) {
                console.log(res)
                setResponse(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMe();
    }, []);



    return (
        <nav className="p-3 bg-yellow-200">
            <div className="container ">
                <div className="flex flex-row items-center">
                    <PiHamburgerBold className='mr-4 text-5xl' />
                    <h1 className='text-lg font-bold md:text-2xl'>Recipe</h1>
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <Hamburger />
                </div>
                <div className={`nav-elements  ${showNavbar && "active"}`}>
                    <ul className="flex items-center">
                        
                        <li>
                            <Link to="/recipe"><span className='text-lg font-bold md:text-2xl'>Home</span></Link>
                        </li>
                        <li>
                            <Link to="/saved"><span className='text-lg font-bold md:text-2xl'>Saved</span></Link>
                        </li>
                        <ul className="flex items-center">
                            <li className="flex items-center" onClick={handleLiClick}>
                                <FaUserCircle className="mr-2 text-3xl text-yellow-500" />
                                <h1 className="text-lg text-gray-500 cursor-pointer md:text-2xl">{response.username}</h1>
                            </li>
                        </ul>
                        {modalVisible && (
                            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                                <div className="flex flex-col items-center justify-center p-4 bg-yellow-200 rounded shadow">
                                    <GrClose onClick={closeModal} className='text-xl font-bold text-yellow-700 cursor-pointer' />
                                    <h1 className="mt-3 mb-4 text-2xl font-bold text-yellow-700">User Profile</h1>
                                    <h1 className="text-lg font-bold text-yellow-700">Username: {response.username}</h1>
                                    <h1 className="text-lg font-bold text-yellow-700">Email: {response.email}</h1>
                                    <button
                                        onClick={handleLogout}
                                        className="w-32 p-3 mt-5 text-lg font-bold text-yellow-700 bg-yellow-500 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>

                        )}
                    </ul>

                </div>
            </div>
        </nav>
    );
}

const Hamburger = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="24"
        viewBox="0 0 52 24"
    >
        <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
            <rect
                id="Rectangle_3"
                data-name="Rectangle 3"
                width="42"
                height="4"
                rx="2"
                transform="translate(304 47)"
                fill="#574c4c"
            />
            <rect
                id="Rectangle_5"
                data-name="Rectangle 5"
                width="42"
                height="4"
                rx="2"
                transform="translate(304 67)"
                fill="#574c4c"
            />
            <rect
                id="Rectangle_4"
                data-name="Rectangle 4"
                width="52"
                height="4"
                rx="2"
                transform="translate(294 57)"
                fill="#574c4c"
            />
        </g>
    </svg>
);



export default Navbar;