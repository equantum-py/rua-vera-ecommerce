["Moda", "Lifestyle", "Objetos & Diseño", "Aromas & Fragancias"].each do |name|
  Category.find_or_create_by!(name: name) { |c| c.slug = name.parameterize }
end
