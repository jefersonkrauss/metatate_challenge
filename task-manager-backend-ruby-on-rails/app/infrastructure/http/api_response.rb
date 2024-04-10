class Http::ApiResponse

  SUCCESS = 'SUCCESS'.freeze
  ERROR = 'ERROR'.freeze

  # @param [String] status
  # @param [Object] data
  # @param [String] message
  # @param [ApiPagination] pagination
  def initialize(status:, data: nil, message: '', pagination: nil)
    @status = status
    @data = data
    @message = message
    @pagination = pagination
  end

  # @param [Object] data
  # @param [String] message
  # @param [ApiPagination] pagination
  def self.success(data: nil, message: '', pagination: nil)
    Http::ApiResponse.new(status: SUCCESS, data: data, message: message, pagination: pagination)
  end

  def self.error(message: nil)
    Http::ApiResponse.new(status: ERROR, message: message)
  end

end
