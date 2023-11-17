export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageURL) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageURL = _imageURL;
  }

  static get() {
    return products;
  }

  static add(productObj) {
    let newProduct = new ProductModel(
      products.length + 1,
      productObj.name,
      productObj.desc,
      productObj.price,
      productObj.imageURL
    );
    products.push(newProduct);
  }

  static getById(id) {
    const result = products.find((p) => p.id == id);
    return result;
  }

  static update(productObj) {
    const index = products.findIndex((p) => p.id == productObj.id);

    products[index] = productObj;
  }

  static delete(productId) {
    productId = parseInt(productId);
    products = products.filter((product) => product.id !== productId);
  }
}

var products = [
  new ProductModel(
    1,
    "Product A",
    "Description for Product A",
    19.99,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNZyuEEqJfFxjb83BbMelcV90-ET3ZgfkDA&usqp=CAU"
  ),
  new ProductModel(
    2,
    "Product B",
    "Description for Product B",
    15.99,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcJUsXfolR7FhxraMbQav_jTo82Qaw-qNzw&usqp=CAU"
  ),
  new ProductModel(
    3,
    "Product C",
    "Description for Product C",
    52.99,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMAOVl1DN20vebTZDjtcQr5ilq8_R2Ps3UlQ&usqp=CAU"
  ),
  new ProductModel(
    4,
    "Product D",
    "Description for Product D",
    59.99,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrBS2qfIKhLfQRqWQNWV1ViU5avOluCwMBUQ&usqp=CAU"
  ),
];
