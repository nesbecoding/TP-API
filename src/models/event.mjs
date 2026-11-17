
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    lieu: {
        type: String,
        required: true,
        trim: true
    },

    photoCouverture: {
        type: String
    },

    visibilite: {
        type: String,
        enum: ['public', 'prive'],
        default: 'public'
    },

    organisateurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    }],

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    }]

}, {
    timestamps: true
});

// At least one organizer is required
EventSchema.path('organisateurs').validate(function (organisateurs) {
    return organisateurs.length > 0;
}, 'An event must have at least one organizer.');

export default mongoose.model('Event', EventSchema);
