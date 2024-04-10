class Api::V1::WorkflowColumnController < ApplicationController
  before_action :authenticate_user!
  before_action :set_workflow_column, only: [:show, :update, :destroy]
  before_action :validate_workflow, only: [:create, :update,]

  # GET /api/v1/workflow-columns
  def index
    @workflow_columns = WorkflowColumn.joins(:workflow).where(workflows: { user: user }).all
    render json: @workflow_columns
  end

  # GET /api/v1/workflow-columns/1
  def show
    render json: @workflow_column
  end

  # POST /api/v1/workflow-columns
  def create
    @workflow_column = WorkflowColumn.new(workflow_column_params)
    if @workflow_column.save
      render json: @workflow_column, status: :created
    else
      render json: @workflow_column.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/workflow-columns/1
  def update
    if @workflow_column.update(workflow_column_params)
      render json: @workflow_column
    else
      render json: @workflow_column.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/workflow-columns/1
  def destroy
    @workflow_column.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_workflow_column
    @workflow_column = WorkflowColumn.joins(:workflow).where(workflows: { user: user }).find_by(id: params[:id])
    render json: {}, status: :not_found if @workflow_column.blank?
  end

  def validate_workflow
    workflow = Workflow.find_by(id: workflow_column_params[:workflow_id], user: user)
    render json: {}, status: :unauthorized unless workflow
  end

  # Only allow a trusted parameter "white list" through.
  def workflow_column_params
    params.require(:workflow_column).permit(:name, :workflow_id, :order)
  end

end
