
import mongoose from 'mongoose';

const TypeBilletSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    nom: {
        type: String,
        required: true,
        trim: true
    },

    prix: {
        type: Number,
        required: true,
        min: 0
    },

    quantiteTotale: {
        type: Number,
        required: true,
        min: 1,
        validate: Number.isInteger
    },

    quantiteVendue: {
        type: Number,
        default: 0,
        min: 0,
        validate: Number.isInteger
    }

}, {
    timestamps: true
});

// Ticket type names must be unique within an event
TypeBilletSchema.index(
    { event: 1, nom: 1 },
    { unique: true }
);

export default mongoose.model('TypeBillet', TypeBilletSchema);
