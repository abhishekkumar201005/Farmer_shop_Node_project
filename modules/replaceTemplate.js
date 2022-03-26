module.exports = (temp, product) => {
  let output = temp.replace(/{%prod_name}/g, product.productName);
  output = output.replace(/{%prod_image}/g, product.image);
  output = output.replace(/{%prod_price}/g, product.price);
  output = output.replace(/{%prod_country}/g, product.from);
  output = output.replace(/{%prod_vitamin}/g, product.nutrients);
  output = output.replace(/{%prod_quantity}/g, product.quantity);
  output = output.replace(/{%prod_description}/g, product.description);
  output = output.replace(/{%prod_id}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC}/g, "not-organic");
  }

  return output;
};
