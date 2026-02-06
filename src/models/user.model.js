const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false },
  versionKey: false
});

// Método estático para manter compatibilidade com a interface anterior se necessário,
// mas o Mongoose já fornece métodos poderosos. 
// Vamos adaptar para que os controllers continuem funcionando com mínimas mudanças.

userSchema.statics.create = async function(userData) {
  const user = new this(userData);
  return await user.save();
};

userSchema.statics.findAll = async function() {
  return await this.find({}, 'name email created_at').sort({ _id: 1 });
};

userSchema.statics.findById = async function(id) {
  return await this.findOne({ _id: id }, 'name email created_at');
};

userSchema.statics.findByEmail = async function(email) {
  return await this.findOne({ email });
};

userSchema.statics.update = async function(id, userData) {
  return await this.findOneAndUpdate(
    { _id: id },
    { $set: userData },
    { new: true, projection: 'name email created_at' }
  );
};

userSchema.statics.delete = async function(id) {
  return await this.findOneAndDelete({ _id: id });
};

// Virtual para ID para manter compatibilidade com retorno de 'id' em vez de '_id'
userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
