import {WorkflowModel} from "@/domain/model/workflow.model.ts";
import axiosInstance from "@/utils/http-client.ts";

const baseURL = '/api/v1/workflow';

const getWorkflows = async (): Promise<WorkflowModel[]> => {
    const response = await axiosInstance.get<WorkflowModel[]>(baseURL);
    return response.data;
};

const getWorkflow = async (id: number): Promise<WorkflowModel> => {
    const response = await axiosInstance.get<WorkflowModel>(`${baseURL}/${id}`);
    return response.data;
};

const createWorkflow = async (data: WorkflowModel): Promise<WorkflowModel> => {
    const response = await axiosInstance.post<WorkflowModel>(baseURL, data);
    return response.data;
};

const updateWorkflow = async (id: number, data: WorkflowModel): Promise<WorkflowModel> => {
    const response = await axiosInstance.put<WorkflowModel>(`${baseURL}/${id}`, data);
    return response.data;
};

const deleteWorkflow = async (id: number): Promise<boolean> => {
    const response = await axiosInstance.delete(`${baseURL}/${id}`);
    return response.status === 200;
};

export { getWorkflows, getWorkflow, createWorkflow, updateWorkflow, deleteWorkflow };
