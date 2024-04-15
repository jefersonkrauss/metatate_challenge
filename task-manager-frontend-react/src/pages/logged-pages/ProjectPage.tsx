import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import {useAuth} from "@/context/AuthContext";
import {ChangeEvent, useEffect, useState} from "react";
import {ProjectModel} from "@/domain/model/project.model.ts";
import {createProject, deleteProject, getProjects, updateProject} from "@/services/project.service.ts";
import {getWorkflows} from "@/services/workflow-service.ts";
import {WorkflowModel} from "@/domain/model/workflow.model.ts";
import {formatDate} from "@/utils/date.util.ts";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProjectPage = () => {
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [workflows, setWorkflows] = useState<WorkflowModel[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [currentProject, setCurrentProject] = useState<ProjectModel | Partial<ProjectModel>>({});
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        void fetchProjects();
        void fetchWorkflows();
    }, [user]);

    const fetchProjects = async (): Promise<void> => {
        const data = await getProjects();
        setProjects(data);
    };

    const fetchWorkflows = async (): Promise<void> => {
        const data = await getWorkflows();
        setWorkflows(data);
    };

    const handleOpen = (event: MouseEvent, project?: ProjectModel): void => {
        event.stopPropagation();
        setCurrentProject(project ?? {});
        setOpen(true);
    };

    const handleBoard = (id: number): void => {
        navigate('/admin/project/board/' + id);
    };

    const handleClose = (): void => {
        setOpen(false);
        setCurrentProject({});
    };

    const handleSave = async (): Promise<void> => {
        if (currentProject.id) {
            await updateProject(currentProject.id, { ...currentProject, userId } as ProjectModel);
        } else {
            await createProject({ ...currentProject, userId } as ProjectModel);
        }
        await fetchProjects();
        handleClose();
    };

    const handleDelete = async (event: MouseEvent, id: number): Promise<void> => {
        event.stopPropagation();
        await deleteProject(id);
        await fetchProjects();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setCurrentProject({ ...currentProject, [event.target.name]: event.target.value });
    };

    const handleSelectWorkflow = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
        setCurrentProject({ ...currentProject, workflowId: event.target.value as number });
    };

    if (!user)
        return null;

    const userId = user.id

    return (
        <Box sx={{ flexGrow: 1, height: '80vh', width: '100vh', overflow: 'auto', p: 3 }}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
                <Box sx={{width: '100%'}}>
                    <Typography variant="h4" sx={{ mb: 2, textAlign: 'left' }}>Project</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button variant="contained" onClick={(event) => handleOpen(event)} sx={{ mb: 2 }}>Create New Project</Button>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="projects table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Workflow</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id} hover onClick={() => handleBoard(project.id)}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>{workflows.find(w => w.id === project.workflowId)?.name}</TableCell>
                                <TableCell>{formatDate(project.createdAt)}</TableCell>
                                <TableCell>{formatDate(project.updatedAt)}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(event) => handleOpen(event, project)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={(event) => handleDelete(event, project.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentProject.id ? 'Edit Project' : 'Create Project'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Name" type="text" fullWidth name="name" value={currentProject.name ?? ''} onChange={handleChange} />
                    <TextField margin="dense" label="Description" fullWidth name="description" value={currentProject.description ?? ''} onChange={handleChange} />
                    <Select
                        value={currentProject.workflowId ?? ''}
                        onChange={handleSelectWorkflow}
                        fullWidth
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" disabled>
                            Select Workflow
                        </MenuItem>
                        {workflows.map((workflow) => (
                            <MenuItem key={workflow.id} value={workflow.id}>
                                {workflow.name}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
