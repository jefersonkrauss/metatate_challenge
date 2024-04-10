class Api::V1::WorkflowController < ApplicationController
  before_action :authenticate_user!
  before_action :set_workflow, only: [:show, :update, :destroy]

  # GET /api/v1/workflows
  def index
    @workflows = Workflow.where(user: user).all
    render json: @workflows
  end

  # GET /api/v1/workflows/1
  def show
    render json: @workflow
  end

  # POST /api/v1/workflows
  def create
    @workflow = Workflow.new(workflow_params)
    @workflow.user = user

    if @workflow.save
      render json: @workflow, status: :created
    else
      render json: @workflow.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/workflows/1
  def update
    if @workflow.update(workflow_params)
      render json: @workflow
    else
      render json: @workflow.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/workflows/1
  def destroy
    @workflow.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_workflow
    @workflow = Workflow.find_by(id: params[:id], user: user)
    render json: {}, status: :not_found if @workflow.blank?
  end

  # Only allow a trusted parameter "white list" through.
  def workflow_params
    params.require(:workflow).permit(:name)
  end

end
