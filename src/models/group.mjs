
import mongoose from 'mongoose';

const GroupeSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String
    },

    membres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    }],

    administrateurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    }]

}, {
    timestamps: true
});

// At least one administrator is required
GroupeSchema.path('administrateurs').validate(function (administrateurs) {
    return administrateurs.length > 0;
}, 'A group must have at least one administrator.');

export default mongoose.model('Groupe', GroupeSchema);
