import {useParams} from 'react-router-dom';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {
    Box,
    Button,
    CardActions,
    CardContent, CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    TextField,
    Typography
} from '@mui/material';

import {ChangeEvent, useEffect, useState} from "react";
import {TaskModel} from "@/domain/model/task.model.ts";
import {BoardModel} from "@/domain/model/board.model.ts";
import {getBoard} from "@/services/board.service.ts";
import {useAlert} from "@/context/AlertContext.tsx";
import {createTask, deleteTask, updateTaskPosition} from "@/services/task.service.ts";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const BoardPage = () => {
    const {projectId} = useParams<{ projectId: string }>();
    const [board, setBoard] = useState<BoardModel | null>(null);
    const [tasks, setTasks] = useState<Record<number, TaskModel[]>>({});

    // const [project, setProject] = useState<ProjectModel | null>(null);
    // const [workflow, setWorkflow] = useState<WorkflowModel | null>(null);
    // const [columns, setColumns] = useState<WorkflowColumnModel[]>([]);
    const [open, setOpen] = useState(false);
    const [newTaskData, setNewTaskData] = useState({title: '', description: '', columnId: 0, position: 0});

    const {showAlert} = useAlert()

    const projectIdRef = parseInt(projectId!);

    const loadData = async () => {
        try {
            const boardModel = await getBoard(projectIdRef);
            setBoard(boardModel)
        } catch (error) {
            showAlert('Unknown Error', 'error', 3000)
            console.error('Failed to load data', error);
        }
    };

    useEffect(() => {
        void loadData();
    }, [projectId, showAlert]);

    useEffect(() => {

        if (!board) return

        console.log('Constuindo o board')

        const taskTemp: Record<number, TaskModel[]> = {}
        board.workflow.columns.forEach((column) => {
            taskTemp[column.id] = column.tasks;
        })
        setTasks(taskTemp)
    }, [board]);

    const handleDragEnd = (result: DropResult) => {

        const {source, destination} = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceColumn = tasks[parseInt(source.droppableId)];
        const destColumn = tasks[parseInt(destination.droppableId)] || sourceColumn;
        const [removed] = sourceColumn.splice(source.index, 1);
        destColumn.splice(destination.index, 0, removed);

        const tasksUpdated = {
            ...tasks,
            [parseInt(source.droppableId)]: sourceColumn,
            [parseInt(destination.droppableId)]: destColumn
        };
        setTasks(tasksUpdated);

        void moveTask(tasksUpdated);
    };

    const moveTask = async (tasksUpdated: Record<number, TaskModel[]>) => {

        const data: TaskModel[] = []

        board?.workflow.columns.forEach(column => {
            tasksUpdated[column.id]?.forEach((task, index) => {
                const newTask: TaskModel = {
                    id: task.id,
                    projectId: projectIdRef,
                    workflowColumnId: column.id,
                    position: index,
                    title: task.title,
                    description: task.description,
                }
                data.push(newTask)
            })
        })
        await updateTaskPosition(projectIdRef, data);
    }

    const handleDelete = async (id: number) => {
        board!.tasks! = board?.tasks.filter(task => task.id !== id) ?? [];
        board!.workflow.columns.forEach((column) => {
            column.tasks = column.tasks.filter(task => task.id !== id);
        })
        await deleteTask(id, projectIdRef)
        setBoard({...board!})
    }

    const handleOpenDialog = (columnId: number, position: number) => {
        setNewTaskData({...newTaskData, columnId, position});
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskData({...newTaskData, [event.target.name]: event.target.value});
    };

    const handleSaveTask = async () => {
        const {title, description, columnId, position} = newTaskData;

        console.log(`title: ${title}`)
        console.log(`description: ${description}`)
        console.log(`columnId: ${columnId}`)
        console.log(`position: ${position}`)

        const data: TaskModel = {
            projectId: projectIdRef,
            workflowColumnId: columnId,
            position: position,
            title: title,
            description: description
        }

        await createTask(data);
        void loadData()
        handleCloseDialog();
    };

    return (
        <Box sx={{flexGrow: 1, height: '70vh', width: '100vh', overflow: 'auto', p: 3}}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
                <Box sx={{width: '100%'}}>
                    <Typography variant="h4" sx={{mb: 2, textAlign: 'left'}}>{board?.project?.name}</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Typography variant="h6" sx={{
                        mb: 2,
                        textAlign: 'left'
                    }}>{board?.project?.name} {board?.workflow?.name}</Typography>
                </Box>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}></Box>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Box sx={{display: 'flex', gap: 2, overflowX: 'scroll'}}>
                    {board?.workflow.columns.map(column => (
                        <Droppable key={column.id} droppableId={String(column.id)}>
                            {(provided, snapshot) => (
                                <Paper ref={provided.innerRef} {...provided.droppableProps} sx={{
                                    width: 300,
                                    minHeight: 500
                                }}>
                                    <Typography variant="h6" sx={{minWidth: 250}}>{column.name}</Typography>
                                    {tasks[column.id]?.map((task, index) => (
                                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                            {(provided) => (
                                                <Card
                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                    sx={{
                                                        minWidth: 240,
                                                        maxWidth: 345,
                                                        boxShadow: 3,
                                                        position: 'relative',
                                                        margin: 2,
                                                        pt: 1,
                                                        pb: 2
                                                    }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="subtitle2" component="div" sx={{ mb: 2, textAlign: 'left' }}>
                                                            {task.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'left' }}>
                                                            {task.description}
                                                        </Typography>
                                                    </CardContent>

                                                    <Box sx={{position: 'absolute', bottom: 0, right: 0}}>
                                                        <CardActions>
                                                            <IconButton onClick={() => handleDelete(task.id!)} color="error">
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </CardActions>
                                                    </Box>
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <Button onClick={() => handleOpenDialog(column.id, tasks[column.id]?.length)}>Add Task</Button>
                                </Paper>
                            )}
                        </Droppable>
                    ))}
                </Box>
            </DragDropContext>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Task Title" type="text" fullWidth name="title"
                               value={newTaskData.title} onChange={handleChange}/>
                    <TextField margin="dense" label="Description" fullWidth name="description"
                               value={newTaskData.description} onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveTask}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BoardPage;
