"use client"
import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {PanelRight} from 'lucide-react';
import Link from 'next/link';

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({open}) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({open}) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


// Import statements remain the same...

// All styled components remain the same...

interface PersistentDrawerLeftProps {
    children?: React.ReactNode;
}

export default function PersistentDrawerLeft({children}: PersistentDrawerLeftProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const sideBarItems : {text: string, url: string}[] = [
        {text: 'Ordenes', url: '/orders'},
        {text: 'Productos', url: '/products'},
        {text: 'Clientes', url: '/customers'},
    ]

    return (
        <Box sx={{display: 'flex', minHeight: '100vh'}}>
            <CssBaseline/>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                    position: "fixed",
                    top: 20,
                    left: 26,
                    zIndex: 1100, // similar al AppBar para que quede arriba
                }}
            >
                <PanelRight color='#404040' size={30} strokeWidth={2.2}/>
            </IconButton>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#171717', // Cambiá este color como prefieras
                        color: '#fff', // texto blanco
                    },

                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                {/* Drawer content remains the same */}
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon sx={{color: 'white'}}/>
                        ) : (
                            <ChevronRightIcon sx={{color: 'white'}}/>
                        )}
                    </IconButton>


                </DrawerHeader>
                <DrawerHeader/>
                <List>
                    {sideBarItems.map((element, index) => (
                        <ListItem key={element.text} disablePadding sx={{px: 1}}>
                            <Link href={element.url} className='w-full'>
                            <ListItemButton
                                selected={selectedIndex === index}
                                onClick={() => setSelectedIndex(index)}
                                sx={{
                                    borderRadius: '12px',
                                    px: 2,
                                    '&:hover': {
                                        backgroundColor: '#222223',
                                        color: '#ffffff',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#404040',
                                        color: '#ffffff',
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: '#404040',
                                        color: '#ffffff',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{color: 'inherit'}}>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={element.text}/>
                            </ListItemButton>
                            </Link>
                        </ListItem>
                        
                    ))}
                </List>

            </Drawer>
            <Main open={open} className={"min-h-full"}>
                {/* Replace the Typography components with children */}
                {children}
            </Main>
        </Box>
    );
}