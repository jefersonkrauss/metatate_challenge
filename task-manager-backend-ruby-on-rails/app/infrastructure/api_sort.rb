class ApiSort

  def initialize(sort: nil, order: nil)
    @sort = sort
    @order = order
  end

  def order_by(default_sort: 'id', default_order: 'asc')
    @sort.present? ? sortable(@sort, @order) :
      sortable(default_sort, default_order)
  end

  def self.from_params(params)
    sort = params[:sort]
    order = params[:order]
    ApiSort.new(sort: sort, order: order)
  end

  private

  def sortable(sort, order)
    [sort, order].reject { |item| item.blank? }.join(' ')
  end
end
