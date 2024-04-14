import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {Route, Routes, Link} from 'react-router-dom';
import {HomePage} from "@/pages/logged-pages/HomePage.tsx";
import {WorkFlow} from "@/pages/logged-pages/WorkFlow.tsx";
import {WorkflowColumn} from "@/pages/logged-pages/WorkflowColumn.tsx";
import {Project} from "@/pages/logged-pages/Project.tsx";


const drawerWidth = 240;

export default function Layout() {

    const menuWorkflow = { title: 'Workflow', path: 'workflow', icon: 'menu' };
    const menuWorkflowColumn = { title: 'Workflow Column', path: 'workflow-column', icon: 'menu' };
    const menuProject = { title: 'Project', path: 'project', icon: 'menu' };
    const menuItems = [menuWorkflow, menuWorkflowColumn, menuProject]

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Task Manager
                    </Typography>
                    <IconButton color="inherit" sx={{marginLeft: 'auto'}}>
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem button key={item.title} component={Link}
                                      to={item.path}>
                                <ListItemIcon>
                                    <MenuIcon/>
                                </ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}>
                <Toolbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="workflow" element={<WorkFlow/>}/>
                    <Route path="workflow-column" element={<WorkflowColumn/>}/>
                    <Route path="project" element={<Project/>}/>
                </Routes>
            </Box>
        </Box>
    );
}
