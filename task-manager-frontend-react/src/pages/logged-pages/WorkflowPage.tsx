import {
    Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { WorkflowModel } from "@/domain/model/workflow.model";
import { createWorkflow, deleteWorkflow, getWorkflows, updateWorkflow } from "@/services/workflow-service";
import {ChangeEvent, useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const WorkflowPage = () => {
    const [workflows, setWorkflows] = useState<WorkflowModel[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [currentWorkflow, setCurrentWorkflow] = useState<WorkflowModel | Partial<WorkflowModel>>({});
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        void fetchWorkflows();
    }, []);

    const fetchWorkflows = async (): Promise<void> => {
        const data = await getWorkflows();
        setWorkflows(data);
    };

    const handleOpen = (event: MouseEvent, workflow?: WorkflowModel): void => {
        event.stopPropagation();
        setIsEdit(Boolean(workflow));
        setCurrentWorkflow(workflow ?? {});
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
        setCurrentWorkflow({});
    };

    const handleSave = async (): Promise<void> => {
        if (isEdit && currentWorkflow.id) {
            await updateWorkflow(currentWorkflow.id, currentWorkflow as WorkflowModel);
        } else {
            await createWorkflow(currentWorkflow as WorkflowModel);
        }
        await fetchWorkflows();
        handleClose();
    };

    const handleDelete = async (event: MouseEvent, id: number): Promise<void> => {
        event.stopPropagation();
        await deleteWorkflow(id);
        await fetchWorkflows();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setCurrentWorkflow({ ...currentWorkflow, [event.target.name]: event.target.value });
    };

    return (
        <Box sx={{ flexGrow: 1, height: '80vh', width: '100vh', overflow: 'auto', p: 3 }}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
                <Box sx={{width: '100%'}}>
                    <Typography variant="h4" sx={{ mb: 2, textAlign: 'left' }}>Workflow</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>Create New Workflow</Button>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workflows.map((workflow) => (
                            <TableRow key={workflow.id} hover>
                                <TableCell component="th" scope="row">{workflow.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(event) => handleOpen(event, workflow)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={(event) => handleDelete(event, workflow.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEdit ? 'Edit Workflow' : 'Create Workflow'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="name"
                        value={currentWorkflow.name ?? ''}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
