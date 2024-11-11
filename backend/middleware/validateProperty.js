export const validateProperty = (req, res, next) => {
  const {
    title,
    description,
    price,
    location,
    latitude,
    longitude,
    propertyType,
    transactionType,
    bedrooms,
    bathrooms,
    size,
    furnished
  } = req.body;

  if (!title || !description || !price || !location || 
      !latitude || !longitude || !propertyType || 
      !transactionType || !bedrooms || !bathrooms || !size) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields"
    });
  }

  if (!["HOUSE", "APARTMENT", "COMMERCIAL", "LAND"].includes(propertyType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid property type"
    });
  }

  if (!["FOR_SALE", "FOR_RENT"].includes(transactionType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid transaction type"
    });
  }

  next();
}; 