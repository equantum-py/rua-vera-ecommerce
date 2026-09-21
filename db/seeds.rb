categories = {
  "Moda" => "Prendas y accesorios de las marcas que forman RUA.",
  "Lifestyle" => "Aromas, detalles y propuestas para acompañar tus espacios y momentos.",
  "Objetos & Diseño" => "Libros, accesorios y objetos especiales elegidos por su identidad.",
  "Aromas & Fragancias" => "Fragancias, velas y piezas aromáticas del universo RUA."
}
categories.each do |name, description|
  category = Category.find_or_create_by!(name: name) { |c| c.slug = name.parameterize }
  category.update!(description: description)
end

products = [
  ["Vestido Lino Vera","RUA-0001","Paradiso","Moda",590000,690000,12,"/brand/vestido-lino-vera.png"],
  ["Camisa Serena","RUA-0002","Las Sureñas","Moda",420000,490000,18,"/brand/camisa-serena.png"],
  ["Pantalón Amalfi","RUA-0003","Lanhtropy","Moda",510000,590000,10,"/brand/pantalon-amalfi.png"],
  ["Blazer Vera","RUA-0004","ERNESTINA","Moda",780000,890000,7,"/brand/blazer-vera.png"],
  ["Vela Baltic Amber","RUA-0014","VOLUSPA","Lifestyle",360000,420000,16,"/brand/vela-baltic-amber.png"],
  ["Difusor French Cade","RUA-0015","VOLUSPA","Lifestyle",410000,470000,12,"/brand/difusor-french-cade.png"],
  ["Set Home Aroma","RUA-0022","VOLUSPA","Lifestyle",590000,680000,7,"/brand/set-home-aroma.png"],
  ["Gift Box RUA","RUA-0025","RUA Vera","Lifestyle",450000,520000,20,"/brand/gift-box-rua.png"],
  ["Bolso Ayra Weekend","RUA-0011","AYRA","Objetos & Diseño",680000,760000,5,"/brand/bolso-ayra-weekend.png"],
  ["Fragancia RUA","RUA-0026","RUA Vera","Aromas & Fragancias",450000,nil,10,"/brand/fragancia-rua-vera.png"]
]
products.each do |name, sku, brand, category, price, compare, stock, image|
  product = Product.find_or_initialize_by(sku: sku)
  product.assign_attributes(name: name, brand: brand, category: Category.find_by!(name: category), price: price, compare_at_price: compare, stock: stock, image_url: image, active: true, description: "Selección RUA Vera · #{brand}.")
  product.save!
end
