import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({ 

    amount: { type: Number, required: true  },
   method: { type: String, required: true  },
   status: { type: String, required: true  },
   transactionId: { type: String, required: true  },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
   createdAt: { type: Date, default: Date.now  }


});