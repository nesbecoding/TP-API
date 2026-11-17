
import mongoose from 'mongoose';

const BilletSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    typeBillet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeBillet',
        required: true
    },

    acheteur: {
        nom: {
            type: String,
            required: true,
            trim: true
        },

        prenom: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        }
    },

    dateAchat: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

// One ticket per buyer email for each event
BilletSchema.index(
    { event: 1, 'acheteur.email': 1 },
    { unique: true }
);

export default mongoose.model('Billet', BilletSchema);
