import Product from '../models/Product';

const productCtrl = {
  getProducts: async (req, res) => {
    const products = await Product.find();
    res.json(products);
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) {
        return res.status(400).json({ msg: 'No Images  upload' });
      }

      const product = await Product.findOne({ product_id });
      if (product) {
        return res.status(400).json({ msg: 'The product already  exists.' });
      }

      const newProduct = new Product({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json({ msg: 'Created Product' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) {
        return res.status(400).json({ msg: 'No Images  upload' });
      }

      await Product.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        },
      );

      res.json({ msg: 'Updated Product successfully.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({
        msg: 'Deleted Product Successfully',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default productCtrl;
