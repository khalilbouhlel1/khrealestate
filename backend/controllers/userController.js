import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

const updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const avatar = req.file?.filename;
    const userId = req.user.id;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email, NOT: { id: userId } }
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use"
        });
      }
    }

    // Check if username is already taken by another user
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username, NOT: { id: userId } }
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already in use"
        });
      }
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (avatar) updateData.avatar = `http://localhost:5000/uploads/${avatar}`;
    
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message
    });
  }
};

// add property
const createProperty = async (req, res) => {
  try {
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
      amenities
    } = req.body;

    // Parse amenities if it's a string
    const parsedAmenities = typeof amenities === 'string' 
      ? JSON.parse(amenities) 
      : amenities || [];

    const images = req.files?.map(file => `http://localhost:5000/uploads/${file.filename}`) || [];
    const userId = req.user.id;

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        location,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        propertyType,
        transactionType,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        size: parseFloat(size),
        furnished: Boolean(furnished),
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        amenities: parsedAmenities,
        images,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property
    });
  } catch (error) {
    console.error("Create property error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error creating property",
      error: error.message 
    });
  }
};
//wishlist
const toggleWishlist = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user.id;

    // Check if property exists in wishlist
    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        userId,
        propertyId
      }
    });

    if (existingWishlist) {
      // Remove from wishlist
      await prisma.wishlist.delete({
        where: {
          id: existingWishlist.id
        }
      });
      
      return res.status(200).json({
        success: true,
        message: "Property removed from wishlist",
        inWishlist: false
      });
    }

    // Add to wishlist
    await prisma.wishlist.create({
      data: {
        userId,
        propertyId
      }
    });

    return res.status(200).json({
      success: true,
      message: "Property added to wishlist",
      inWishlist: true
    });
  } catch (error) {
    console.error("Toggle wishlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating wishlist"
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlistItems = await prisma.wishlist.findMany({
      where: {
        userId
      },
      include: {
        property: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true
              }
            }
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      wishlist: wishlistItems.map(item => item.property)
    });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist"
    });
  }
};

export { updateProfile, createProperty, toggleWishlist, getWishlist };
