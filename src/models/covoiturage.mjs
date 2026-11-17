
import mongoose from 'mongoose';

const CovoiturageSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    conducteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },

    depart: {
        type: String,
        required: true,
        trim: true
    },

    dateDepart: {
        type: Date,
        required: true
    },

    placesDisponibles: {
        type: Number,
        required: true,
        min: 1,
        validate: Number.isInteger
    },

    passagers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    }]

}, {
    timestamps: true
});

export default mongoose.model('Covoiturage', CovoiturageSchema);
