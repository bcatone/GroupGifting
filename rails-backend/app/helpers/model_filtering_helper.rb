module ModelFilteringHelper

  # Method to handle queries based on one-to-one, one-to-many, and many-to-many relationships
  def filter_by_attributes(model_type, params)
    if params.present?

      # Only allow permitted params
      permitted_params = params.permit(model_type.column_names.map(&:to_sym))
      filtered_model = model_type.where(permitted_params)

      model_type.reflect_on_all_associations(:has_many).each do |association|

        if association.options[:through] && params["#{association.foreign_key}"].present?
          through_class = association.options[:through].to_s.classify.constantize
          ids = through_class.where("#{association.foreign_key}": params["#{association.foreign_key}"]).pluck("#{model_type.name.singularize.camelize.constantize}_id")
          filtered_model = filtered_model.where(id: ids)
        end

      end

      filtered_model

    else
      model_type.all
    end
  end
end