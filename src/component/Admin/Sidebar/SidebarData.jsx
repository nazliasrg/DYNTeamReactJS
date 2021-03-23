import React, { Component } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as VscIcons from 'react-icons/vsc';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Books',
        path: '#',
        icon: <AiIcons.AiFillAccountBook />,
        iconClosed: <AiIcons.AiFillCaretDown />,
        iconOpened: <AiIcons.AiFillCaretUp />,
        subNav: [
            {
                title: 'Manage Books',
                path: '/home',
                icon: <AiIcons.AiFillBook />
            }
        ]
    },
    {
        title: 'Role',
        path: '#',
        icon: <BsIcons.BsFillPersonFill />,
        iconClosed: <AiIcons.AiFillCaretDown />,
        iconOpened: <AiIcons.AiFillCaretUp />,
        subNav: [
            {
                title: 'Manage Users',
                path: '/users',
                icon: <FaIcons.FaUserFriends />
            },
            {
                title: 'Manage Admin',
                path: '/admin',
                icon: <RiIcons.RiAdminFill />
            }
        ]
    },
    {
        title: 'Activities',
        path: '#',
        icon: <FiIcons.FiActivity />,
        iconClosed: <AiIcons.AiFillCaretDown />,
        iconOpened: <AiIcons.AiFillCaretUp />,
        subNav: [
            {
                title: 'Waiting Confirm',
                path: '/pending',
                icon: <VscIcons.VscLoading />
            },
            {
                title: 'On Going',
                path: '/activity',
                icon: <FiIcons.FiActivity />
            },
            {
                title: 'History',
                path: '/history',
                icon: <FaIcons.FaHistory />
            }
        ]
    },
    {
        title: 'Logout',
        path: '/login-admin',
        icon: <FiIcons.FiLogOut />,
        iconClosed: <AiIcons.AiFillCaretDown />,
        iconOpened: <AiIcons.AiFillCaretUp />,
    }
]