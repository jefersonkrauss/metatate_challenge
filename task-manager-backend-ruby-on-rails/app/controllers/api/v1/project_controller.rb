class Api::V1::ProjectController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :update, :destroy]
  before_action :validate_workflow, only: [:create, :update,]

  # GET /api/v1/projects
  def index
    @projects = Project.where(user: user).all
    render json: @projects
  end

  # GET /api/v1/projects/1
  def show
    render json: @project
  end

  # POST /api/v1/projects
  def create
    @project = Project.new(project_params)
    @project.user = user

    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/projects/1
  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/projects/1
  def destroy
    @project.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find_by(id: params[:id], user: user)
    render json: {}, status: :not_found if @project.blank?
  end

  def validate_workflow
    workflow = Workflow.find_by(id: project_params[:workflow_id], user: user)
    render json: {}, status: :unauthorized unless workflow
  end

  # Only allow a trusted parameter "white list" through.
  def project_params
    params.require(:project).permit(:name, :description, :workflow_id)
  end

end
