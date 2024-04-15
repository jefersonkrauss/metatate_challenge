import {WorkflowColumnModel} from "@/domain/model/workflow-column.model.ts";
import axiosInstance from "@/utils/http-client.ts";
import {camelizeKeys, decamelizeKeys} from "humps";

const baseUrl = '/api/v1/workflow-column';

export const getWorkflowColumns = async () => {
    const { data } = await axiosInstance.get<WorkflowColumnModel[]>(baseUrl);
    return camelizeKeys(data) as WorkflowColumnModel[];
};

export const getWorkflowColumn = async (id: number) => {
    const { data } = await axiosInstance.get<WorkflowColumnModel>(`${baseUrl}/${id}`);
    return camelizeKeys(data) as WorkflowColumnModel;
};

export const createWorkflowColumn = async (column: WorkflowColumnModel) => {
    const { data } = await axiosInstance.post<WorkflowColumnModel>(baseUrl, decamelizeKeys(column));
    return camelizeKeys(data) as WorkflowColumnModel;
};

export const updateWorkflowColumn = async (id: number, column: WorkflowColumnModel) => {
    const { data } = await axiosInstance.put<WorkflowColumnModel>(`${baseUrl}/${id}`, decamelizeKeys(column));
    return camelizeKeys(data) as WorkflowColumnModel;
};

export const deleteWorkflowColumn = async (id: number) => {
    const response = await axiosInstance.delete(`${baseUrl}/${id}`);
    return response.status === 200;
};
