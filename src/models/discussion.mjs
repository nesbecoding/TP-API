
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
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

const DiscussionSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },

    groupe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groupe'
    },

    messages: [MessageSchema]

}, {
    timestamps: true
});

// A discussion must belong to exactly one event or group
DiscussionSchema.pre('validate', function () {
    const hasEvent = !!this.event;
    const hasGroup = !!this.groupe;

    if (hasEvent === hasGroup) {
        this.invalidate(
            'event',
            'A discussion must belong to either an event or a group, not both.'
        );
    }
});

export default mongoose.model('Discussion', DiscussionSchema);
