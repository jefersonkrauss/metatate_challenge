class ApiPagination

  attr_reader :count, :page_index, :per_page, :offset, :total_pages

  PER_PAGE_DEFAULT = 10
  PAGE_INDEX_DEFAULT = 0
  MAX_PER_PAGE_DEFAULT = 100

  def initialize(count: 0, page_index: PAGE_INDEX_DEFAULT, per_page: PER_PAGE_DEFAULT)
    @count = count
    @page_index = page_index
    @per_page = per_page > 100 ? MAX_PER_PAGE_DEFAULT : per_page
    @offset = @page_index * @per_page
    @total_pages = total_pages(count: count)
  end

  def total_pages(count:)
    (count / @per_page.to_f).ceil
  end

  def self.from_params(params, count: 0)
    ApiPagination.new(
      count: count,
      page_index: params[:page_index]&.to_i || PAGE_INDEX_DEFAULT,
      per_page: params[:per_page]&.to_i || PER_PAGE_DEFAULT
    )
  end
end
