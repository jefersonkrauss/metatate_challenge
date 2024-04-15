import {
    Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select
} from '@mui/material';
import { getWorkflows } from "@/services/workflow-service";
import {WorkflowColumnModel} from "@/domain/model/workflow-column.model.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {WorkflowModel} from "@/domain/model/workflow.model.ts";
import {
    createWorkflowColumn,
    deleteWorkflowColumn,
    getWorkflowColumns,
    updateWorkflowColumn
} from "@/services/workflow-column.service.ts";
import {useAlert} from "@/context/AlertContext.tsx";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const WorkflowColumnPage = () => {
    const [columns, setColumns] = useState<WorkflowColumnModel[]>([]);
    const [workflows, setWorkflows] = useState<WorkflowModel[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [currentColumn, setCurrentColumn] = useState<WorkflowColumnModel | Partial<WorkflowColumnModel>>({});
    const { showAlert } = useAlert()

    useEffect(() => {
        void fetchWorkflows();
        void fetchColumns();
    }, []);

    const fetchColumns = async (): Promise<void> => {
        const data = await getWorkflowColumns();
        setColumns(data);
    };

    const fetchWorkflows = async (): Promise<void> => {
        const data = await getWorkflows();
        setWorkflows(data);
    };

    const handleOpen = (event: MouseEvent, column?: WorkflowColumnModel): void => {
        event.stopPropagation();
        setCurrentColumn(column ?? {});
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
        setCurrentColumn({});
    };

    const handleSave = async (): Promise<void> => {
        try {
            if (currentColumn.id) {
                await updateWorkflowColumn(currentColumn.id, currentColumn as WorkflowColumnModel);
            } else {
                await createWorkflowColumn(currentColumn as WorkflowColumnModel);
            }
        } catch (error) {
            console.log(error)
            showAlert('Unknown Error', 'error', 3000)
        }
        await fetchColumns();
        handleClose();
    };

    const handleDelete = async (event: MouseEvent, id: number): Promise<void> => {
        event.stopPropagation();
        await deleteWorkflowColumn(id);
        await fetchColumns();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setCurrentColumn({ ...currentColumn, [event.target.name]: event.target.value });
    };

    const handleSelectWorkflow = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
        setCurrentColumn({ ...currentColumn, workflowId: event.target.value as number });
    };

    return (
        <Box sx={{ flexGrow: 1, height: '80vh', width: '100vh', overflow: 'auto', p: 3 }}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
                <Box sx={{width: '100%'}}>
                    <Typography variant="h4" sx={{ mb: 2, textAlign: 'left' }}>Workflow Columns</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>Create New Workflow Column</Button>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table stickyHeader aria-label="workflow columns table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Order</TableCell>
                            <TableCell>Workflow</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {columns.map((column) => (
                            <TableRow key={column.id} hover>
                                <TableCell>{column.name}</TableCell>
                                <TableCell>{column.order}</TableCell>
                                <TableCell>{workflows.find(w => w.id === column.workflowId)?.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(event) => handleOpen(event, column)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={(event) => handleDelete(event, column.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentColumn.id ? 'Edit Column' : 'Create Column'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="name"
                        value={currentColumn.name ?? ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Order"
                        type="number"
                        fullWidth
                        variant="standard"
                        name="order"
                        value={currentColumn.order ?? ''}
                        onChange={handleChange}
                    />
                    <Select
                        value={currentColumn.workflowId ?? ''}
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
