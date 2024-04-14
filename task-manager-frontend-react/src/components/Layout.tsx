import {useState} from 'react';
import {CSSObject, styled, Theme, ThemeProvider, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewCozyIcon from '@mui/icons-material/ViewCozy';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {Avatar, Card, CardContent, PaletteMode} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@/pages/logged-pages/HomePage.tsx";
import {WorkFlow} from "@/pages/logged-pages/WorkFlow.tsx";
import {WorkflowColumn} from "@/pages/logged-pages/WorkflowColumn.tsx";
import {Project} from "@/pages/logged-pages/Project.tsx";
import LogoutIcon from "@mui/icons-material/Logout";
import ToggleColorMode from "@/components/mui/ToggleColorMode.tsx";
import {currentMode, toggleCurrentMode} from "@/services/theme-service.ts";
import theme, {ThemeMode} from "@/theme/theme.ts";
import Link from "@mui/material/Link";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export interface LayoutProps {
    mode: PaletteMode;
}

export default function Layout() {
    const themeAux = useTheme();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<ThemeMode>(currentMode());

    const toggleColorMode = () => {
        setMode((prev) => (prev === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark));
        toggleCurrentMode()
    };

    const menuWorkflow = {title: 'Workflow', path: 'workflow', icon: <ViewCozyIcon />};
    const menuWorkflowColumn = {title: 'Workflow Column', path: 'workflow-column', icon: <ViewColumnIcon />};
    const menuProject = {title: 'Project', path: 'project', icon: <WorkOutlineIcon />};
    const menuItems = [menuWorkflow, menuWorkflowColumn, menuProject]

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme(mode)}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Avatar sx={{mr: 2}} src="/static/images/avatar/1.jpg"/>
                        <Typography variant="h6" noWrap component="div">
                            John Doe - johndoe@example.com
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <ToggleColorMode color="inherit" sx={{marginLeft: 'auto'}} mode={mode} toggleColorMode={toggleColorMode}/>
                        <IconButton color="inherit" sx={{marginLeft: 'auto'}}>
                            <LogoutIcon/>
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {themeAux.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem key={item.title} disablePadding sx={{display: 'block'}}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    component={Link} to={item.path}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {/*{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                </Drawer>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <DrawerHeader/>
                    <Card raised sx={{margin: 2}}>
                        <CardContent>
                            <Routes>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="workflow" element={<WorkFlow/>}/>
                                <Route path="workflow-column" element={<WorkflowColumn/>}/>
                                <Route path="project" element={<Project/>}/>
                            </Routes>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </ThemeProvider>
    );
}