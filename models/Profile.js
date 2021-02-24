const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
   empresa: {
       type: String
   },
   website: {
       type: String
   },
   localizacao: {
       type: String
   },
   nivel: {
       type: String,
       required: true
   },
   competencias: {
       type: [String],
       required: true
   },
   bio: {
       type: String
   },
   githubusername: {
       type: String
   },
   experiencia: [
       {
           funcao: {
                type: String,
                required: true
           },
           empresa: {
               type: String,
               required: true
           },
           localizacao: {
               type: String
           },
           de: {
               type: Date,
               required: true
           },
           ate: {
               type: Date
           },
           atual: {
               type: Boolean,
               default: false
           },
           descricao: {
               type: String
           }
       },
    ],
    educacao: [
        {
            escola: {
                type: String,
                required: true
            },
            nivel: {
                type: String,
                required: true
            },
            localdeestudo: {
                type: String,
                required: true
            },
            de: {
                type: Date,
                required: true
            },
            ate: {
                type: Date
            },
            atual: {
                type: Boolean,
                default: false
            },
            descricao: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },

    data: {
        type: Date,
        default: Date.now
    }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);