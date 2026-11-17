
import mongoose from 'mongoose';

const CommentaireSchema = new mongoose.Schema({
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },

    contenu: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const PhotoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },

    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },

    dateAjout: {
        type: Date,
        default: Date.now
    },

    commentaires: [CommentaireSchema]
});

const AlbumSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
        unique: true
    },

    photos: [PhotoSchema]

}, {
    timestamps: true
});

export default mongoose.model('Album', AlbumSchema);
