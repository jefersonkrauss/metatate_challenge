class Api::V1::TaskController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project
  before_action :validate_workflow_column, only: [:create, :update]
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /api/v1/tasks
  def index
    @tasks = Task.active.joins(:project).where(projects: { user: user }, project: @project).all
    render json: @tasks
  end

  # GET /api/v1/tasks/1
  def show
    render json: @task
  end

  # POST /api/v1/tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/tasks/1
  def destroy
    @task.update!(is_deleted: true)
    render json: {}, status: :no_content
  end

  private

  def set_project
    @project = Project.find_by(id: task_params[:project_id], user: user)
    render json: {}, status: :unauthorized unless @project
  end

  def validate_workflow_column
    @workflow_column = WorkflowColumn.joins(:workflow).where(workflows: { user: user }).find_by(id: task_params[:workflow_column_id])
    render json: {}, status: :unauthorized if @workflow_column.blank? || @workflow_column.workflow_id != @project.workflow_id
  end

  def set_task
    @task = Task.active.find_by(id: params[:id], project: @project)
    render json: {}, status: :not_found if @task.blank?
  end

  def task_params
    params.permit(:title, :description, :project_id, :workflow_column_id, :responsible_user_id)
  end

end
