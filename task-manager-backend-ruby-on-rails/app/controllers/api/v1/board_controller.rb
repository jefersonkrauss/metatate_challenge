class Api::V1::BoardController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project


  def show
    workflow = @project.workflow
    active_tasks = @project.tasks.active.ordered
    columns = workflow.workflow_columns.ordered.map do |column|
      {
        id: column.id,
        name: column.name,
        order: column.order,
        tasks: active_tasks.where(workflow_column_id: column.id).map { |item| TaskSerializer.new(item).attributes }
      }
    end

    data = {
      project: @project,
      workflow: {
        name: workflow.name,
        columns: columns
      },
      tasks: active_tasks.active.map { |item| TaskSerializer.new(item).attributes }
    }
    render json: data
  end

  private

  def set_project
    @project = Project.find_by(id: task_params[:project_id], user: user)
    render json: {}, status: :forbidden unless @project
  end

  def task_params
    params.permit(:project_id)
  end

end
