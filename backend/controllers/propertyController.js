import prisma from '../lib/prisma.js';

const getProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: 'AVAILABLE'
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      properties
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching properties' 
    });
  }
}; 
// get property by id

 const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      property
    });
  } catch (error) {
    console.error('Get property by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching property'
    });
  }
};

 const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
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
      furnished,
      yearBuilt,
      amenities,
      status
    } = req.body;

    // Check if property exists and belongs to user
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (existingProperty.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    // Handle new images if they exist
    const newImages = req.files?.map(file => `http://localhost:5000/uploads/${file.filename}`);
    
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(location && { location }),
      ...(latitude && { latitude: parseFloat(latitude) }),
      ...(longitude && { longitude: parseFloat(longitude) }),
      ...(propertyType && { propertyType }),
      ...(transactionType && { transactionType }),
      ...(bedrooms && { bedrooms: parseInt(bedrooms) }),
      ...(bathrooms && { bathrooms: parseInt(bathrooms) }),
      ...(size && { size: parseFloat(size) }),
      ...(furnished !== undefined && { furnished: Boolean(furnished) }),
      ...(yearBuilt && { yearBuilt: parseInt(yearBuilt) }),
      ...(amenities && { amenities: typeof amenities === 'string' ? JSON.parse(amenities) : amenities }),
      ...(status && { status }),
      ...(newImages?.length && { images: [...existingProperty.images, ...newImages] })
    };

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      property: updatedProperty
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating property',
      error: error.message
    });
  }
};

 const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if property exists and belongs to user
    const property = await prisma.property.findUnique({
      where: { id }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (property.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await prisma.property.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting property'
    });
  }
};
const getUserProperties = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const properties = await prisma.property.findMany({
        where: {
          userId
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
  
      res.status(200).json({
        success: true,
        properties
      });
    } catch (error) {
      console.error('Get user properties error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user properties'
      });
    }
  };

export { getProperties, getPropertyById, updateProperty, deleteProperty, getUserProperties };
