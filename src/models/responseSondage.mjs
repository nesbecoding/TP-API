
import mongoose from 'mongoose';

const ReponseSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    choixSelectionne: {
        type: String,
        required: true
    }
});

const ReponseSondageSchema = new mongoose.Schema({
    sondage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sondage',
        required: true
    },

    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },

    reponses: {
        type: [ReponseSchema],
        validate: {
            validator: function (reponses) {
                const questionIds = reponses.map(r => r.question.toString());
                return new Set(questionIds).size === questionIds.length;
            },
            message: 'A participant can select only one answer per question.'
        }
    }

}, {
    timestamps: true
});

// One response per participant per poll
ReponseSondageSchema.index(
    { sondage: 1, participant: 1 },
    { unique: true }
);

export default mongoose.model('ReponseSondage', ReponseSondageSchema);
