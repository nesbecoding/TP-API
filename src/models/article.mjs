
import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    quantite: {
        type: Number,
        required: true,
        min: 1,
        validate: Number.isInteger
    },

    ajoutePar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },

    achete: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

// An item name must be unique within an event
ArticleSchema.index(
    { event: 1, nom: 1 },
    { unique: true }
);

export default mongoose.model('Article', ArticleSchema);
