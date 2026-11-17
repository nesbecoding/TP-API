
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    intitule: {
        type: String,
        required: true,
        trim: true
    },

    choix: [{
        type: String,
        required: true,
        trim: true
    }]
});

const SondageSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    createur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },

    questions: {
        type: [QuestionSchema],
        validate: {
            validator: function (questions) {
                return questions.length > 0 &&
                    questions.every(q => q.choix.length >= 2);
            },
            message: 'A poll needs at least one question and each question needs at least two choices.'
        }
    }

}, {
    timestamps: true
});

export default mongoose.model('Sondage', SondageSchema);
