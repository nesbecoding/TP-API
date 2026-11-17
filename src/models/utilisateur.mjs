
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UtilisateurSchema = new mongoose.Schema({
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
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    }

}, {
    timestamps: true
});

// Hash password before saving
UtilisateurSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 12);
});

// Compare password during login
UtilisateurSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Never return password in JSON
UtilisateurSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

export default mongoose.model('Utilisateur', UtilisateurSchema);
