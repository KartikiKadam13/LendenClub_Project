import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = () => {
    const { userData, setIsLoggedin } = useContext(AppContent);
    const { initializeSocket } = useContext(SocketContext);
    const navigate = useNavigate();

    const onGetStarted = async (e) => {
        e.preventDefault();

        try {
            axios.defaults.withCredentials = true;

            if (userData) {
                // Initialize the socket connection
                const socket = initializeSocket();

                socket.emit('joinGame', { userId: userData.id });

                navigate('/tictactoe-game');
            } else {
                toast.error('You must log in to start the game.');
            }
        } catch (error) {
            toast.error('Something went wrong! ' + error.message);
        }
    };

    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
            <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6' />

            <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-semibold mb-2'>
                Welcome {userData ? userData.name : ''} to the Tic Tac Toe World
                <img src={assets.hand_wave} alt="" className='w-8 aspect-square' />
            </h1>

            <h2 className='text-2xl sm:text-1xl font-medium mb-4'>
                Every move shapes the game, just like every choice shapes your journey. Play wisely, win boldly!
            </h2>
            <p className='mb-8 max-w-md'>Up for a quick brain workout? Let's play!</p>
            <button onClick={onGetStarted} className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition all'>
                Get Started
            </button>
        </div>
    );
};

export default Header;
