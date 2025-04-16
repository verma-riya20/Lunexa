import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be at least 0']
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: {
        values: ['Pads', 'Tampons', 'Cups', 'Underwear', 'Wellness', 'Other'],
        message: 'Please select correct category for product'
      }
    },
    images: [
      {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: [0, 'Stock cannot be negative']
    },
    ratings: {
      type: Number,
      default: 0
    },
    numOfReviews: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true
        },
        name: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);