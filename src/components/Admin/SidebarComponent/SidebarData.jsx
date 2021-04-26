import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as VscIcons from 'react-icons/vsc';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Manage Books',
        path: '#',
        icon: <AiIcons.AiFillAccountBook />,
        iconClosed: <AiIcons.AiFillCaretDown />,
        iconOpened: <AiIcons.AiFillCaretUp />,
        subNav: [
            {
                title: 'Books',
                path: '/home-admin',
                icon: <AiIcons.AiFillBook />
            },
            {
                title: 'Author',
                path: '/book-author',
                icon: <FaIcons.FaUserAlt />
            },
            {
                title: 'Category',
                path: '/book-category',
                icon: <AiIcons.AiFillCodepenCircle />
            },
            {
                title: 'Publisher',
                path: '/book-publisher',
                icon: <FaIcons.FaBox />
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
                path: '/admin-role',
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