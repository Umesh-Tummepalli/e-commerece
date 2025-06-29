export async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1=req.file.image1[0];

  } catch (err) {
    console.log(err);
  }
}

export async function listProducts(req, res) {}

export async function removeProduct(req, res) {}

export async function productInfo(req, res) {}
